import {SiteClient} from 'datocms-client';

export default async function recebedorDeRequests(request, response){
   if(request.method === 'POST'){
        const TOKEN = '5eef3e8b930d362a5534af6504e7b7';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "968376",
            ... request.body
        });

        response.json({
            dados: 'isso aqui é um teste',
            registroCriado: registroCriado
        });
        return;
   }

   response.status(404).json({
       message: 'Ainda não temos nada no GET, mas no POST tem :)'
   });
}