const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('国名を入力（英語）', (countryName) => {
  https.get(`https://restcountries.com/v2/name/${countryName}?fullText=true`, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      try {
        const country = JSON.parse(data);
        if (country.length > 0) {
          console.log(`国名:${countryName}の首都は${country[0].capital}`);
        } else {
          console.log(`入力を確認してくだい。${countryName}`);
        }
      } catch (error) {
        console.error(error);
      }
      rl.close();
    });
  });
});
