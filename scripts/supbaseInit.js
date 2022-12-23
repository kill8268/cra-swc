const readline = require('readline');
const { existsSync, writeFileSync } = require('fs')

if (existsSync('./.env.supabase')) return
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`what's your SUPABASE_URL? `, (SUPABASE_URL) => {
  rl.question(`what are you SUPABASE_KEY? `, (SUPABASE_KEY) => {
    writeFileSync('./.env.supabase',
      `REACT_APP_SUPABASE_URL=${SUPABASE_URL}
REACT_APP_SUPABASE_KEY=${SUPABASE_KEY}`)
    console.info('supbase env file created to your directory. you can run `yarn start` now.')
    rl.close();
  })
})



