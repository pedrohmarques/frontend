import React from 'react'

import Logo from '../../assets/imgs/iconLogo.svg'

export default props =>  (
            <div className="form">
                <div className="row">
                    <aside className="logo-login">
                        <img src={Logo} alt="logo"></img>
                    </aside>
                    <div className="col-12 col-md-12 d-flex">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control" maxLength="50"
                                name="email"
                                value={props.user.email}
                                onChange={e=>props.updateField(e)}
                                placeholder="Digite o email..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-12 d-flex">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control" maxLength="8"
                                name="senha"
                                value={props.user.senha}
                                onChange={e=>props.updateField(e)}
                                placeholder="Digite a senha..." />
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-end pt-20">
                        <button className="btn btn-secondary" onClick={e=>props.redirectCadastro(e)}>Cadastrar</button>
                        <button className="btn btn-primary ml-2" onClick={e=> props.userLogin(e)}>Entrar</button>
                    </div>
                </div>
        </div>
)