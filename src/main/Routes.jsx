import React from 'react'
import {Switch, Route, Redirect} from 'react-router'
import { isAuthenticated } from "../components/services/auth";

import Login from '../components/login/Login'
import User from '../components/cadastro/User'
import Home from '../components/home/Home'
import ListaCrud from '../components/listas/ListaCrud'
import CategoriaCrud from '../components/categorias/CategoriaCrud'
import ProdutoCrud from '../components/produtos/ProdutoCrud'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
);

const Routes = () => {
    return(
        <Switch>
        <Route exact path='/' component={Login}></Route>
        <Route exact path='/users' component={User}></Route>
        <PrivateRoute exact path='/home' component={Home}></PrivateRoute>
        <PrivateRoute exact path='/list' component={ListaCrud}></PrivateRoute>
        <PrivateRoute exact path='/categories' component={CategoriaCrud}></PrivateRoute>
        <PrivateRoute exact path='/products' component={ProdutoCrud}></PrivateRoute>
        <Redirect from='*' to='/home'></Redirect>
    </Switch>
    )
}

export default Routes