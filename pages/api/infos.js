
import { GoogleSpreadsheet  } from 'google-spreadsheet';



export default async function handler(req, res) {
  const doc = new GoogleSpreadsheet('1Y72SkakFPHVnyvKxS_CLnhRymPhrYxw4uJGwiVsDpug');
  await doc.useServiceAccountAuth({
    // client_email: credentials.client_email,
    // private_key: credentials.private_key,
    client_email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL,
  private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY,
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

  const rows = await sheet.getRows();

  const infos = rows.map( ({date, weight, imc, body_fat, muscle_rate, fat_free_dough,subcutaneous_fat, visceral_fat,body_water, skeletal_muscle_mass, muscle_mass,bone_mass,protein,tmb,metabolic_age })=>{
    return {date, weight, imc, body_fat, muscle_rate, fat_free_dough,subcutaneous_fat, visceral_fat,body_water, skeletal_muscle_mass, muscle_mass,bone_mass,protein,tmb,metabolic_age }
  })

  res.send({
    title: doc.title,
    infos,
  })
}
