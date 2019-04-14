import React from 'react'

export default props =>
<div className="form">
    <div className="row">
        <div className="col-12 col-md-12 d-flex">
            <div className="form-group">
                <label>Nome</label>
                <input type="text" className="form-control" maxLength="40"
                    name="nome"
                    value={props.user.nome}
                    onChange={e=>props.updateField(e)}
                    placeholder="Digite o nome..." />
            </div>
        </div>
        
        <div className="col-12 col-md-12 d-flex">
            <div className="form-group">
                <label>E-mail</label>
                <input type="email" className="form-control" maxLength="25"
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
            <button className="btn btn-secondary" onClick={e => props.backLogin(e)}>Voltar</button>
            <button className="btn btn-primary ml-2" onClick={e => props.cadastro(e)}>Cadastrar</button>
        </div>
    </div>
</div>