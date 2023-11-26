import express from "express";
import path from "path";

const PORTA = 3000;
const HOST = "0.0.0.0";

const app = express();

var lista_usuarios = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "src")));

app.post(`/processar`, (req, res) => {
  let passou = 10;
    if (req.body.nome.length < 3) {
        passou = 0;
        var conteudo = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
        <style>
        input[type="text"]::placeholder {
          color: #b3b3b3;
        }
        
        label[for="nome"],
        label[for="email"],
        label[for="idade"] {
          color: #808080;
        }
        
        input[type="text"],
        input[type="email"],
        input[type="number"] {
          background-color: #333;
          color: #fff;
          border: 1px solid #595959;
          border-radius: 4px;
          padding: 10px;
          margin-top: 5px;
          margin-bottom: 10px;
        }
        
        body {
          font-family: 'Arial', sans-serif;
          background-color: #1a1a1a;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        
        .container {
          background-color: #282828;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
          text-align: center;
          color: #fff;
        }
        
        form {
          display: flex;
          flex-direction: column;
          max-width: 400px;
          margin: 0 auto;
          color: #fff;
        }
        
        label {
          margin-top: 10px;
          color: #ccc;
        }
        
        button {
          background-color: #4CAF50;
          color: #fff;
          padding: 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        button:hover {
          background-color: #45a049;
        }
        </style>
        </head>
        <body>
            <div class="container">
                <h1>Formulário </h1>
                <form action="/processar" method="post" novalidate>
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" value ="${req.body.nome}" required>
                    <p>Necessita de mais de 3 caracteres</p>`
    }else{
        var conteudo = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
        <style>
        input[type="text"]::placeholder {
          color: #b3b3b3;
        }
        
        label[for="nome"],
        label[for="email"],
        label[for="idade"] {
          color: #808080;
        }
        
        input[type="text"],
        input[type="email"],
        input[type="number"] {
          background-color: #333;
          color: #fff;
          border: 1px solid #595959;
          border-radius: 4px;
          padding: 10px;
          margin-top: 5px;
          margin-bottom: 10px;
        }
        
        body {
          font-family: 'Arial', sans-serif;
          background-color: #1a1a1a;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        
        .container {
          background-color: #282828;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
          text-align: center;
          color: #fff;
        }
        
        form {
          display: flex;
          flex-direction: column;
          max-width: 400px;
          margin: 0 auto;
          color: #fff;
        }
        
        label {
          margin-top: 10px;
          color: #ccc;
        }
        
        button {
          background-color: #4CAF50;
          color: #fff;
          padding: 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        button:hover {
          background-color: #45a049;
        }
        </style>
        </head>
        <body>
            <div class="container">
                <h1>Formulário </h1>
                <form action="/processar" method="post" novalidate>
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" value ="${req.body.nome}" required>`
    }
    if(req.body.email.length<10){
        passou = 0;
        conteudo +=`
        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" value ="${req.body.email}" required>
        <p>Necessita de mais caracteres</p>`
    }else{
      conteudo +=`
      <label for="email">E-mail:</label>
      <input type="email" id="email" name="email" value ="${req.body.email}" required>`
    }
    if(req.body.idade && req.body.idade>=0){
    conteudo +=`<label for="idade">Idade:</label>
    <input type="number" id="idade" name="idade" value ="${req.body.idade}" required>

    <button type="submit">Cadastrar</button>
    </form>
    <ul><!-- ListaCadastrados --></ul>
    </div>

  </div>
  </body>
  </html>`
  }else{
    passou = 0;
    conteudo +=`<label for="idade">Idade:</label>
    <input type="number" id="idade" name="idade" value ="${req.body.idade}" required>
    <p>Este campo está invalido.</p>
    <button type="submit">Cadastrar</button>
</form>
<ul><!-- ListaCadastrados --></ul>
</div>

</div>
</body>
</html>`
  }if(passou==10){
    
    const user = {
        nome: req.body.nome,
        email: req.body.email,
        idade: req.body.idade
    };

    lista_usuarios.push(user);
    console.log(lista_usuarios);

    res.redirect(`/lista`);
  }else{
    res.end(conteudo);
  }
});

app.get(`/lista`, (req, res) => {
    let conteudo = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Usuários</title>
            <style>
                /* Your CSS styles here */
            </style>
        </head>
        <body>
            <h1>Usuarios cadastrados</h1>
            <table style="width:100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Nome</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Email</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Idade</th>
                    </tr>
                </thead>
                <tbody>`;

    for (const usuario of lista_usuarios) {
        conteudo += `
            <tr style="border: 1px solid #ddd;">
                <td style="padding: 12px;">${usuario.nome}</td>
                <td style="padding: 12px;">${usuario.email}</td>
                <td style="padding: 12px;">${usuario.idade}</td>
            </tr>`;
    }

    conteudo += `
                </tbody>
            </table>
            <div style="margin-top: 20px;">
                <a href="/" style="text-decoration: none; padding: 10px 20px; background-color: #4CAF50; color: white; border-radius: 5px; margin-right: 10px;">Voltar ao Menu</a>
                <a href="/form.html" style="text-decoration: none; padding: 10px 20px; background-color: #008CBA; color: white; border-radius: 5px;">Continuar Cadastrando</a>
            </div>
        </body>
        </html>`;

    res.header("Content-Type", "text/html");
    res.end(conteudo);
});

app.get(`/`, (req, res) => {
    res.send(`<h1><a href="/form.html">Clique Aqui</a></h1>`);
});

app.listen(PORTA, HOST, () => {
    console.log(`Rodando em ${HOST}:${PORTA}`);
});