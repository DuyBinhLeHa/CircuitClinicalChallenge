import React, { Fragment } from 'react';

class Footer extends React.Component {
    render() {
        return <Fragment>
            <hr className="featurette-divider" />
            <footer style={{ padding: "0 50px" }} className="navbar fixed-bottom">
                <p className="float-right"><a href="/">Back to the Top</a></p>
                <p>Copyright &copy; 2022 Hau Luu</p>
            </footer>
        </Fragment>;
    }
}

export default Footer;
