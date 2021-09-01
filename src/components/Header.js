import Logo from '../assets/img/logo.png'

function Header() {
    return (
        <nav class="navbar sticky-top navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img src={Logo} alt="Logo" width="30" height="30" class="d-inline-block align-text-top" />
            <span className="m-2">ABC Insurance</span>
          </a>
          <span class="navbar-text">
            <a className="m-2" href="/">Home</a>              
            <a className="m-2" href="/analytics">Analytics</a>              
          </span>
        </div>
      </nav>
    )
}

export default Header;