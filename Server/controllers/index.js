const { User } = require("../models");
const { compareHash } = require("../helpers/password-hashing-bcrypt");
const { encodeToken } = require("../helpers/jwt-encode-decode");
const { randomString } = require("../helpers/random-string");
const { OAuth2Client } = require("google-auth-library");
const { default: axios } = require("axios");

class Controller {
    static async registerNewUser(req, res, next) {
        const { username, email, password, phoneNumber, address } = req.body;

        try {
            const newUser = await User.create({
                username,
                email,
                password,
                role: "Customer",
                phoneNumber,
                address
            });

            res.status(201).json({
                id: newUser.id,
                email: newUser.email,
                message: `User with email ${newUser.email} and username ${newUser.username} is succesfully registered`
            });
        } catch (err) {
            next(err);
        }
    }

    static async loginUser(req, res, next) {
        const { email, password } = req.body;

        try {
            if (!email) {
                throw { name: "email_is_required" };
            }
            if (!password) {
                throw { name: "password_is_required" };
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw { name: "wrong_email_or_password" };
            }

            const isPasswordCorrect = compareHash(password, user.password);
            if (!isPasswordCorrect) {
                throw { name: "wrong_email_or_password" };
            }

            const encodedToken = encodeToken({ id: user.id });

            res.status(200).json({
                access_token: encodedToken,
                username: user.username,
                email: user.email,
                role: user.role,
                message: `${user.username} is successfully logged in`
            });
        } catch (err) {
            next(err);
        }
    }

    static async googleLoginUser(req, res, next) {
        try {
            // console.log(req.headers.google_access_token);
            const googleAccessToken = req.headers.google_access_token;
            const client = new OAuth2Client(
                "794142405359-n7ub7rrvk7nolpej3rf6f52g1k81njsl.apps.googleusercontent.com"
            );

            const ticket = await client.verifyIdToken({
                idToken: googleAccessToken,
                audience:
                    "794142405359-n7ub7rrvk7nolpej3rf6f52g1k81njsl.apps.googleusercontent.com" 
            });

            const payload = ticket.getPayload();
            // console.log(payload);

            const { name, email } = payload;

            const password = randomString(20);
            // console.log(password)
            const [newUser, created] = await User.findOrCreate({
                where: { email },
                defaults: {
                    username: name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 99999),
                    email,
                    password: password,
                    role: "Staff"
                }

            });

            // console.log(payload, { newUser, created}, "<<<< Cek ini!!!");

            const encodedToken = encodeToken({ id: newUser.id });

            let role = newUser.role;
            let username = newUser.username;

            let code, message;
            if (created) {
                code = 201;
                message = `User with email ${email} and username ${username} is succesfully registered`;
            } else {
                code = 200;
                message = `${username} is successfully logged in`;
            }

            res.status(code).json({
                access_token: encodedToken,
                username: username,
                email: email,
                role: role,
                message: message
            });
        }
        catch (err) {
            next(err);
        }
    }

    static async getAllCompaniesInIndonesia(req, res, next) {

        try {
          const { data } = await axios({
            method: "get",
            url: "https://api.goapi.id/v1/stock/idx/companies",
            params: {
              "api_key": process.env.GO_API_KEY,
            },
          });
    
          res.status(200).json(data.data.results);
        } catch (err) {
          next(err);
        }
    }

    
    static async getUSCompanyNews(req, res, next) {
        try {
          const { symbol } = req.query;
          
          const { data } = await axios({
            method: "get",
            url: "https://api.stockdata.org/v1/news/all",
            params: {
              symbols: symbol,
              filter_entities: true,
              language: "en",
              api_token: process.env.STOCK_DATA_API_KEY,
            },
          });
    
          const news = data.data.map((el) => {
            const newsObject = {
              title: el.title,
              desc: el.description,
              imgUrl: el.image_url,
              createdAt: new Date(el.published_at).toLocaleDateString("en-EN", {
                dateStyle: "medium",
              }),
              source: el.source,
              url: el.url,
            };
            return newsObject;
          });
    
          res.status(200).json(news);
        } catch (err) {
          next(err);
        }
    }
    
    static async getIDBusinessNews(req, res, next) {
        try {

          const { data } = await axios({
            method: "get",
            url: "https://newsapi.org/v2/top-headlines",
            params: {
              country: "id",
              category: "business",
              apiKey: process.env.NEWS_API_KEY,
            },
          });
    
          const news = data.articles.map((el) => {
            const newsObject = {
              title: el.title,
              imgUrl: el.image_url,
              createdAt: new Date(el.publishedAt).toLocaleDateString("en-EN", {
                dateStyle: "medium",
              }),
              source: el.author,
              url: el.url,
            };
            return newsObject;
          });
    
          res.status(200).json(news);
        } catch (err) {
          next(err);
        }
    }


}

module.exports = Controller;
