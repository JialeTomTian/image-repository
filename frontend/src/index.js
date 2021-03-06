import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
    <Auth0Provider
    domain="dev-0ut-dv2g.us.auth0.com"
    clientId="DBHgIgO3Tcb0e8cXki1lvXULpuD3EdhT"
    redirectUri={window.location.origin}
    audience="https://image-repository/api"
    scope="read:current_user update:current_user_metadata"
    >
      <App />
    </Auth0Provider>,
  document.getElementById('root')
);

