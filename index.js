const axios = require("axios");
const { Client } = require("@notionhq/client"); //Name into brackets because its an object
const notion = new Client({auth: process.env.NOTION_KEY});

function getIDFromURL(URL) {
  let endpoint = 0;
  let startpoint = 0;
  
  for (let i = URL.length - 1; (i >= 0 && endpoint == 0) || startpoint == 0; i--)
  {
    if (URL[i] == "/") {
      startpoint = i + 1;
    } else if (URL[i] == "?") {
      endpoint = i;
    }
  }

  return URL.substring(startpoint, endpoint);
}

async function addAssignment(name, priority) 
{
  const response = await notion.pages.create({
    parent:
    {
      "database_id": TASKS_ID
    },
    properties:
    {
      "Nombre":
      {
        "title":[{
          "text":
          {
            "content": name
          }
        }]
      },
      "Estado":
      {
        "status":
        {
          "name":"Sin empezar"
        }
      },
      "Prioridad": {
        "select": {
          "name": priority
        }
      }
    }
    
    
  });
}

async function addEvent(name, date) 
{
  const response = await notion.pages.create({
    parent:
    {
      "database_id": CALENDAR_ID
    },
    properties:
    {
      "Nombre":
      {
        "title":[{
          "text":
          {
            "content": name
          }
        }]
      },
      "Fecha":
      {
        "date":
        {
          "start": date
        }
      }
    }
    
    
  });
}

async function addNote(title, content) 
{
  const response = await notion.pages.create({
    parent:
    {
      "database_id": NOTES_ID
    },
    properties:
    {
      "Nombre":
      {
        "title":[{
          "text":
          {
            "content": title
          }
        }]
      }
    },
    "children":[{
       "paragraph": {
          "rich_text": [{
            "type": "text",
            "text": {
              "content": content
            }
          }],
          "color": "default"
      }
    }]
  });
}

//Main
const TASKS_ID = getIDFromURL("https://www.notion.so/e5f99d39e23e4502b11f4bb22eb602cb?v=1fb1786b01464052b4ed242721fdb12f&pvs=4")
const CALENDAR_ID = getIDFromURL("https://www.notion.so/863db8e383424cf7939dade9d6dc2e8f?v=cc3645d26f4d46de86a4fa93e3612a79&pvs=4")
const NOTES_ID = getIDFromURL("https://www.notion.so/a65281741ceb494e96f9d63b7ef0956c?v=f980aad49b2b42999334360f3f33b8ff&pvs=4")

addAssignment("Programar subida de archivos a la BD", "Media")
//addEvent("Reunión por Ms Teams", new Date().toISOString().slice(0, 10))
//addNote("¿Qué es una base de datos?", "Una base de datos es una recopilación organizada de información o datos estructurados, que normalmente se almacena de forma electrónica en un sistema informático. Normalmente, una base de datos está controlada por un sistema de gestión de bases de datos (DBMS). En conjunto, los datos y el DBMS, junto con las aplicaciones asociadas a ellos, reciben el nombre de sistema de bases de datos, abreviado normalmente a simplemente base de datos.");