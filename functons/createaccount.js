async function createaccount(data){
    delete data.sotp;
      const { MongoClient } = require('mongodb');
      const client = new MongoClient('mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority');
          try {
            await client.connect();
            let {rollnumber} = data;
            let {password} = data;
            let {smhdl} = data;
            console.log('Connected to the MongoDB cluster');
            const database = client.db('HandleIt');
            const collection = database.collection('AllUserDetails');
            const collection1 = database.collection(rollnumber);
            const query1 = { rollnumber: rollnumber };
            const chresult1 = await collection.findOne(query1);
            if(chresult1){
                if(chresult1.password===password && chresult1.smhdl===smhdl){
                    return 'Logged in successfully';
                }
                else{
                    return 'Incorrect password or social media handle';
                }
                
                
            }

            else{
                const result = await collection.insertOne(data);
                return 'Logged in successfully';
            }

          } catch (error) {
              return 'There is a problem in login please try again later or check your internet connection';
              
            } finally {
            await client.close();
          }
          
  
      }
      
  
  
  module.exports = createaccount;