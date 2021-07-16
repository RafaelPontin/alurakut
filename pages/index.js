import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import BoxContainer from '../src/components/BoxInfo';
import {comunidadesDados, pessoasFavoritasDados} from '../src/dados';


function ProfileSidebar(props){
  return(
    <Box as="aside">
          <img src={`https://github.com/${props.gitHubUser}.png`} style={{borderRadius: '8px'}}/>
          <hr />
          <p>
            <a className="boxLink" href={`https://github.com/${props.gitHubUser}`}>
                @{props.gitHubUser}
            </a>
          </p>
          <hr />
          <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {

  const gitHubUser = 'RafaelPontin';
  const [comunidades, setComunidade] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([])

  React.useEffect(function(){
      fetch('https://api.github.com/users/peas/followers')
      .then(function (repostaDoServidor){
        return repostaDoServidor.json();
      })
      .then(function (respostaCompleta){
        console.log(respostaCompleta);
        setSeguidores(respostaCompleta.map((object, index) => {
          return(
            {
              id: new Date().getTime() + object.login,
              title: object.login,
              imageUrl: `https://github.com/${object.login}.png` 
            }
          );
        }));
    })

   
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '501a4421087a3b6cf5c495d203abce',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }`
   })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato)
      setComunidade(comunidadesVindasDoDato)
    })



  }, [])

  return (
    <>
      <AlurakutMenu githubUser={gitHubUser}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
            <ProfileSidebar gitHubUser={gitHubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
               Bem vindo(a) {gitHubUser} 
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form method="POST" onSubmit={function handleCriaComunidade(e){
              e.preventDefault();

              const dadosDoForm = new FormData(e.target);
        
              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: gitHubUser
              }

              if(comunidade.imageUrl === ""){
                comunidade.imageUrl = "https://picsum.photos/200/300?id=" + new Date().getTime();
              }

              fetch('/api/comunidades', {
                  method: 'POST',
                  headers:{
                    'Content-Type' : 'application/json'
                  },
                  body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                console.log(comunidadesAtualizadas);
                setComunidade(comunidadesAtualizadas)
              })

            }}>
                <div>
                <input 
                    placeholder="Qual vai ser o nome da sua comunicadade?"
                    name="title"
                    aria-label="Qual vai ser o nome da sua comunicadade?"
                    type="text"
                />
                </div>
                <div>
                <input 
                    placeholder="Coloque uma URL para usarmos de capa"
                    name="image"
                    aria-label="Coloque uma URL para usarmos de capa"
                />
                </div>    
                <button>
                  Criar Comunidade
                </button>          
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          
          <BoxContainer title= "Pessoas da comunidades" info = {seguidores} />
          <BoxContainer title="Comunidades" info={comunidades} />
        </div>
      </MainGrid>
    </>
  );
}
