import { defineStore } from 'pinia'
import axios from "axios";
import Swal from "sweetalert2";

export const useTradingStore = defineStore('trading', {
  state: () => ({
    baseUrl: 'https://tradingbuddy-production.up.railway.app/',
    isLogin: false,
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    companies: [],
    IDNews: [],
    isLoadingNews: false,
  }),
  actions: {
    async register() {
      try {
        const { data } = await axios({
          method: "post",
          url: `${this.baseUrl}register`,
          data: {
            username: this.username,
            email: this.email,
            password: this.password,
            phoneNumber: this.phoneNumber,
            address: this.address
          },
        });
        // console.log(data.message)
        this.swalFire('RegisterSuccess', data.message)
        this.username = ''
        this.email = ''
        this.password = ''
        this.phoneNumber = ''
        this.address = ''
        this.router.push("/login");
      } catch (err) {
        // console.log(err)
        this.swalFire('RegisterError', err.response.data.message)
      }
    },
    async login() {
      try {
        const { data } = await axios({
          method: "post",
          url: `${this.baseUrl}login`,
          data: {
            email: this.email,
            password: this.password,
          },
        });
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('email', data.email)

        this.fetchIDNews()

        this.router.push("/");
        this.isLogin = true;
        this.username = data.username
        this.email = data.email

        this.username = ''
        this.email = ''
        this.password = ''
        // console.log(data)
        this.swalFire('LoginSuccess', data.message)
      } catch (err) {
        // console.log(err)
        this.swalFire('LoginError', err.response.data.message)
      }
    },
    async googleLogin(googleCredential) {
      try {
        const { data } = await axios({
          method: "post",
          url: `${this.baseUrl}login-with-google`,
          headers: {
            google_access_token: googleCredential,
          },
        });

        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('email', data.email)

        this.fetchIDNews()

        this.router.push("/");
        this.isLogin = true;

        // console.log(data)
        this.swalFire('LoginSuccess', data.message)
      } catch (err) {
        // console.log(err)
        this.swalFire('LoginError', err.response.data.message)
      }
    },
    async fetchIDNews() {
      this.isLoadingNews = true
      this.router.push({name:'news'})
      try {
      
        const { data } = await axios({
          method: 'get',
          url: `${this.baseUrl}get-id-business-news`,
          headers: {
            access_token: localStorage.access_token
          }
        })

        if(data.length < 1){
          this.router.push({name: 'NotFound'})
        } else {
          
          this.IDNews = data;
          // console.log(this.IDNews)
          this.router.push({name:'news'})
        }

      } catch (err) {
        console.log(err)
      } finally {
        this.isLoadingNews = false
      }

    },
      swalFire(value, data) {

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000
        });

        switch (value) {
          case 'LoginSuccess':
          case 'RegisterSuccess':
          case 'LogoutSuccess':
            Toast.fire({
              icon: "success",
              iconColor: "red",
              background: "#191919",
              color: "white",
              template: '#toast-template',
              title: data
            });
            break;
          case 'SuccessXXX':
            Swal.fire({
              icon: "success",
              iconColor: "red",
              confirmButtonColor: "red",
              background: "#191919",
              color: "white",
              template: '#my-template',
              title: data
            });
            break;
          case 'LoginError':
          case 'RegisterError':
          case 'ErrorXXX':
            Swal.fire({
              icon: "error",
              iconColor: "red",
              confirmButtonColor: "red",
              background: "#191919",
              color: "white",
              template: '#my-template',
              title: data
            });
            break;

        }
      }
    },
  })
