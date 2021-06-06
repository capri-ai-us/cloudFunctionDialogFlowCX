/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */


exports.detectIntent = async(req,res) =>{
  var sessionPath = req.body.sessionPath;
  var languageCode = req.body.languageCode;
  var query = req.body.userQuery;
  console.log('query:', query)

  const {SessionsClient} = require('@google-cloud/dialogflow-cx');
  const DFclient = new SessionsClient;
     const DFrequest = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query
            },
        languageCode,
        },
    }
    const [DFresponse] = await DFclient.detectIntent(DFrequest);
    console.log('DFResponse:', DFresponse.queryResult.responseMessages);
    res.send({
      'AgentResponses' : DFresponse.queryResult.responseMessages
    })



}