import React,{Component} from 'react'

export default props =>  (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-12 d-flex">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={props.user.email}
                                onChange={e=>props.updateField(e)}
                                placeholder="Digite o email..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-12 d-flex">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control"
                                name="senha"
                                value={props.user.senha}
                                onChange={e=>props.updateField(e)}
                                placeholder="Digite a senha..." />
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e=> props.userLogin(e)}>Salvar</button>
                        <button className="btn btn-secondary ml-2" onClick={e=>props.redirectCadastro(e)}>Cadastrar</button>
                    </div>
                </div>
        </div>
)