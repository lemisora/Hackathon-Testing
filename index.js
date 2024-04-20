const axios = require("axios");
const { Client } = require("@notionhq/client"); //Name into brackets because its an object
const notion = new Client({auth: process.env.NOTION_KEY});

function getIDFromURL(URL) {
  let endpoint = 0;
  let startpoint = 0;
  
  URL.replace("TASKTIDE-", "");
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

async function addAssignment(name) 
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
const NOTES_ID = getIDFromURL("https://www.notion.so/4da93023337b46be926931f9ebf169bf?v=6eb91d69a7b145c08323b02be9c09a44&pvs=4")

addAssignment("Reporte x")
addEvent("Reunión por TEAMS", new Date().toISOString().slice(0, 10))
addNote("Segunda Ley de Newton", "La segunda ley de Newton dicta que la fuerza es directamente proporcional al producto de la masa por la aceleración");