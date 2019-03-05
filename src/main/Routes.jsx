import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import Home from '../components/home/Home'
import ListaCrud from '../components/listas/ListaCrud'
import CategoriaCrud from '../components/categorias/CategoriaCrud'
import ProdutoCrud from '../components/produtos/ProdutoCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/list' component={ListaCrud}></Route>
        <Route exact path='/categories' component={CategoriaCrud}></Route>
        <Route exact path='/products' component={ProdutoCrud}></Route>
        <Redirect from='*' to='/'></Redirect>
    </Switch>