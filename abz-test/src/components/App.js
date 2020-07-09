import React, { Component } from 'react';
import './styles/App.scss';
import logo from './assets/logo.svg';
import icon from './assets/menu-icon.png';
import man from './assets/man-laptop-v1.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoadedToken: false,
      isLoadedUsers: false,
      isLoadedPositions: false,
      token: '',
      usersResult: [],
      positions: [],
      countPage: 1,
      transformMobileMenu: 'translateX(-100%)',
      styleCover: 'none',
      buttonVisibility: '',
      modalDisplay: 'none',
    };
  }

  openMobileMenu = () => {
    this.setState({
      transformMobileMenu: 'translateX(0%)',
      styleCover: 'block',
    })
  }

  closeMobileMenu = () => {
    this.setState({
      transformMobileMenu: 'translateX(-100%)',
      styleCover: 'none',
    })
  }

  closeModalWindow = () => {
    this.setState({
      modalDisplay: 'none',
    })
  }

  getUsers = (page) => {
    fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`) 
    .then(res => res.json()) 
    .then(
    (result) => {
        this.setState({
        isLoadedUsers: true,
        usersResult: result
        });
    },
    (error) => {
        this.setState({
        isLoadedUsers: true,
        error
        });
    }
    )  
}

 getToken = () => {
  fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token') 
  .then(res => res.json()) 
  .then(
    (result) => {
        this.setState({
        isLoadedToken: true,
        token: result.token
        });
    },
    (error) => {
        this.setState({
        isLoadedToken: true,
        error
        });
    }
  )  
}

  getPosition = () => {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions') 
    .then(res => res.json()) 
    .then(
      (result) => {
          this.setState({
          isLoadedPositions: true,
          positions: result.positions
          });
      },
      (error) => {
          this.setState({
          isLoadedPositions: true,
          error
          });
      }
    )  
}

  componentDidMount() {
    const { countPage } = this.state;
    this.getUsers(countPage);
    this.setState({
      countPage: countPage + 1,
    });
    this.getToken();
    this.getPosition();
  }

  handleClick = () => {
    const { usersResult, countPage } = this.state; 
    this.getUsers(countPage);
    this.setState({
      countPage: countPage + 1,
    })
    if ((usersResult.total_pages - 1) === usersResult.page) {
      this.setState({
        buttonVisibility: 'hidden',
      })
    }   
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.getToken();
    const { token, isLoadedToken } = this.state;
    if (isLoadedToken === true) {
      const form = event.target;
      const formData = new FormData(form);

      fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', { 
        method: 'POST', 
        body: formData, 
        headers: { 
          'Token': token, 
        }, 
      }) 
      .then(res => res.json()) 
      .then(
        (result) => {
          console.log(result); 
          if (result.success) { 
            this.getUsers(1); 
            this.setState({
              modalDisplay: 'block',
            })
          } else { 
            console.log('ошибочка') 
        } 
        },
        (error) => {
          this.setState({
            error
          });
        }
      )  
    }
  }

  render() { 
    const { error, isLoadedUsers, usersResult } = this.state;
    const { isLoadedPositions, positions } = this.state;
    const styleButton = { visibility: this.state.buttonVisibility };  
    const styleMobileMenu = { transform: this.state.transformMobileMenu };
    const styleCover = { display: this.state.styleCover };
    const styleModal = { display: this.state.modalDisplay };
    return (
      <>
      <div className="cover" style={styleCover} onClick={this.closeMobileMenu}></div>
      <div className="mobile-menu-wrapper" style={styleMobileMenu}>
        <h1><img src={logo} alt="logo"></img></h1>
        <hr></hr>
        <ul className="mobile-menu">
          <div>
            <li className="menu__item"><a href="#header" className="link menu__link">About me</a></li>
            <li className="menu__item"><a href="#relationships" className="link menu__link">Relationships</a></li>
            <li className="menu__item"><a href="#users" className="link menu__link">Users</a></li>
            <li className="menu__item"><a href="#signup" className="link menu__link">Sign Up</a></li>
            <li className="menu__item"><a href="#" className="link menu__link">Terms and Conditions</a></li>
          </div>
          <hr></hr>
          <div>
            <li className="menu__item"><a href="#" className="link menu__link">How it works</a></li>
            <li className="menu__item"><a href="#" className="link menu__link">Partnership</a></li>
            <li className="menu__item"><a href="#" className="link menu__link">Help</a></li>
            <li className="menu__item"><a href="#" className="link menu__link">Leave testimonial</a></li>
            <li className="menu__item"><a href="#" className="link menu__link">Contact us</a></li>
          </div>
          <hr></hr>
          <div>
            <li className="menu__item"><a href="#" className="link menu__link">Articles</a></li>
            <li className="menu__item"><a href="#" className="link menu__link">Our news</a></li>
            <li className="menu__item"><a href="#" className="link menu__link">Testimonials</a></li>
            <li className="menu__item"><a href="#" className="link menu__link">Licenses</a></li>
            <li className="menu__item"><a href="#" className="link menu__link">Privacy Policy</a></li>
          </div>
        </ul>
      </div>
      <div className="modalWindow" style={styleModal}>
        <div className="modal">
          <h2 className="modal__heading">Congratulations <span onClick={this.closeModalWindow}>&#128938;</span></h2>
          <p>You have successfully passed the registration.</p>
          <button className="button modal__button" onClick={this.closeModalWindow}>Great</button>
        </div>
      </div>
        <header className="header" id="header">
          <div className="container">
            <div className="header__inner">
              <h1><img src={logo} alt="logo"></img></h1>
              <nav className="navbar">
                <img src={icon}  onClick={this.openMobileMenu} className="sandwich"></img>
                <ul className="menu">
                  <li className="menu__item"><a href="#header" className="link menu__link">About me</a></li>
                  <li className="menu__item"><a href="#relationships" className="link menu__link">Relationships</a></li>
                  <li className="menu__item"><a href="#requirements" className="link menu__link">Requirements</a></li>
                  <li className="menu__item"><a href="#users" className="link menu__link">Users</a></li>
                  <li className="menu__item"><a href="#signup" className="link menu__link">Sign Up</a></li>
                </ul>
              </nav>
            </div>
           
          </div>
        </header>
        <main className="main">
          <div className="container">
            <div className="relationships" id="relationships">
              <div className="relationships-text">
                <p className="section-heading relationships-text__header">TEST ASSIGNMENT FOR FRONTEND DEVELOPER POSITION</p>
                <p className="relationships-text__body">We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository. 
                  <span className="relationships-text__body2"> Please be patient, we consider and respond to every application that meets minimum requirements. We look forward 
                    to your submission. Good luck! The photo has to scale in the banner area on the different screens.
                  </span>
                </p>
                <button className="button relationships-text__button"><a href="#signup" className="link relationships-text__link">Sign up now</a></button>
              </div>
            </div>
            <div className="requirements" id="requirements">
              <p className="section-heading requirements__header">Let's get acquainted</p>
              <div className="requirements__inner">
                <div className="image-container">
                  <img src={man} className="requirements__image" alt="Man with laptop"></img>
                </div>
                <div className="requirements__text">
                  <h2>I am cool frontend developer</h2>
                  <p>We will evaluate how clean you approach to writing CSS and Javascript code is.
                    You can use any CSS and Javascript 3rd party libraries without any restriction.
                  </p>
                  <p>If 3rd party css/javascript libraries are added to the project via bower/npm/yarn 
                    you will get bonus points. If you use any task runner (gulp, webpack) you will get 
                    bonus points as well. Slice service directory page PSD mockup into HTML5/CSS3.
                  </p>
                  <button className="button requirements__button"><a href="#signup" className="link requirements__link">Sign up now</a></button>
                </div>
              </div>
            </div>       
            <div className="users" id="users">
              <p className="section-heading users__header">Our cheerful users</p>
              <h4 className="users__subheader">Attention! Sorting users by registration date</h4>
              <div className="users__info">
              { isLoadedUsers ? (
                usersResult.users
                .sort((item1, item2) => item2.registration_timestamp - item1.registration_timestamp)
                .map(item => (
                  <div className="user" key={item.id}>
                    <img className="user__image" src={item.photo} alt="user photo" />
                    <h2 className="user__name" title={item.name}>{item.name}</h2>
                    <p title={item.position}>{item.position}</p>
                    <p title={item.email}>{item.email}</p>
                    <p title={item.phone}>{item.phone}</p>
                  </div>
                ))  
                  ) : (<p>Not Loaded</p>) }
                  {
                  error ? (<p>{error}</p>) : (false)
                  }
              </div>
              <button style={styleButton} onClick={() => this.handleClick()} className="button users__button">Show more</button>
            </div>        
            <div className="signup" id="signup">
              <p className="section-heading signup__header">Register to get a work</p>
              <div className="signup__inner">
                <h4 className="signup__subheader">Attention! After successfull registration and alert, update the list of users in the block from the top</h4>
                <form className="form" onSubmit={this.handleSubmit}>
                  <div className="form__top">
                      <label>Name
                        <input type="text" name="name" className="input" placeholder="Your name" required />
                      </label><br />
                      <label>Email
                        <input type="email" name="email" className="input" placeholder="Your email" required />
                      </label><br />
                      <label>Phone Number
                        <input type="phone" name="phone" className="input" placeholder="+380 XX XXX XX XX" required />
                      </label><br />
                      <span>Enter phone number in open format</span><br />
                  </div>
                  <div className="form__bottom">
                    <p>Select your position</p>
                    { isLoadedPositions ? (
                    positions
                    .map(position => (
                      <label key={position.id}>
                        <input type="radio" name="position_id" value={position.id} defaultChecked={true} />{position.name}
                        <br></br>
                      </label>
                    ))  
                      ) : (<p>Not Loaded</p>) }
                      {
                      error ? (<p>{error}</p>) : (false)
                      }
                    <p className="photo-heading">Photo</p>
                    <div className="input-container">
                      <input type="text" className="input input-unreal" placeholder="Upload your photo" />
                      <input type="file" id="file" name="photo" required />
                      <label className="input" htmlFor="file">Browse</label>
                    </div>
                  </div>
                  <button className="button signup__button">Sing up now</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}


export default App;

