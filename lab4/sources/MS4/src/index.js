// require("dotenv").config();

const env = {
  MS4_MS2_URL: "http://11.111.111.111",
  MS4_GOOGLE_CLOUD_PROJECT_ID: "id-projecta-google-cloud",
  MS4_GOOGLE_CLOUD_BIGTABLE_INSTANCE_ID: "id-bigtable",
  MS4_GOOGLE_CLOUD_BIGTABLE_SERVICE_EMAIL:
    "bigtable-service-account@imay-proecta.iam.gserviceaccount.com",
  MS4_GOOGLE_CLOUD_BIGTABLE_PRIVATE_KEY:
    "-----BEGIN PRIVATE KEY-----privatni kluch-----END PRIVATE KEY-----\n",
  MS4_GOOGLE_CLOUD_BIGQUERY_SERVICE_EMAIL:
    "bigquery-service-account@imay-proecta.iam.gserviceaccount.com",
  MS4_GOOGLE_CLOUD_BIGQUERY_PRIVATE_KEY:
    "-----BEGIN PRIVATE KEY-----privatni kluch-----END PRIVATE KEY-----\n",
};

const axios = require("axios");
const { v4: uuid } = require("uuid");
const { Bigtable } = require("@google-cloud/bigtable");
const { BigQuery } = require("@google-cloud/bigquery");

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = async (req, res) => {
  console.log(" < < < < < < < <");
  const obj = await main();
  console.log(" > > > > > > > >");

  res.status(obj.status).send(obj.data);
};

exports.deleteTables = async (req, res) => {
  console.log(" < < < < < < < <");
  await BigTable_deleteTable();
  await BigQuery_dropTable();
  await BigQuery_dropSchema();
  console.log(" > > > > > > > >");

  res.status(200).send({
    status: 200,
    message: "Удалена таблица BigTable. Удалено таблица BigQuery",
  });
};

async function main() {
  try {
    const MS2_answer = await get_MS2_answer();

    // < < < < < = = = = = Работа с BigTable
    const bigtable_table_is_exists = await BigTable_existsTable();
    if (!bigtable_table_is_exists) {
      await BigTable_createTable();
      await BigTable_createFamily();
    }
    await BigTable_insertIntoTable({
      "column-family-name": {
        ph_date: MS2_answer.ph_date,
        ph_answer: JSON.stringify(MS2_answer.ph_answer),
        ph_url: MS2_answer.ph_url,
        ph_json: JSON.stringify(MS2_answer.ph_json).replaceAll('"', "'"),
      },
    });
    const bigtable_rows = await BigTable_selectTable();
    // = = = = = > > > > >

    // < < < < < = = = = = Работа с BigQuery
    await BigQuery_createSchema();
    await BigQuery_createTable();
    await BigQuery_insertIntoTable(MS2_answer);
    const bigquery_rows = await BigQuery_selectTable();
    // = = = = = > > > > >

    const result = {
      status: 200,
      data: {
        MS2_answer,
        bigtable_rows,
        bigquery_rows,
        string_MS2_answer: JSON.stringify(MS2_answer, null, 2),
        string_bigtable_rows: JSON.stringify(bigtable_rows, null, 2),
        string_bigquery_rows: JSON.stringify(bigquery_rows, null, 2),
      },
    };

    return result;
  } catch (err) {
    console.log(" < < < < = = = = start error");
    console.log(err);
    console.log(" end error = = = = > > > >");
    return {
      status: 500,
      message: `${err}`,
    };
  }
}

function getDate(d = new Date()) {
  const y = d.getFullYear();

  let m = d.getMonth() + 1;
  m = m < 10 ? `0${m}` : `${m}`;

  let da = d.getDate();
  da = da < 10 ? `0${da}` : `${da}`;

  let h = d.getHours();
  h = h < 10 ? `0${h}` : `${h}`;

  let mi = d.getMinutes();
  mi = mi < 10 ? `0${mi}` : `${mi}`;

  let s = d.getMinutes();
  s = s < 10 ? `0${s}` : `${s}`;

  return `${y}-${m}-${da} ${h}:${mi}:${s}`;
}

async function get_MS2_answer() {
  const url = `${env.MS4_MS2_URL}/api/posts`;
  try {
    const body = {
      userId: 1,
      title: uuid(),
      content: `${new Date().toJSON()}. ${uuid()}! ${uuid()}?`,
    };

    const response = await axios.post(url, body);

    const ph_date = getDate();
    const ph_url = url;
    const ph_answer = true;
    const ph_json = response.data;

    const result = {
      ph_date,
      ph_url,
      ph_answer,
      ph_json,
    };

    return result;
  } catch (err) {
    if (err?.response?.status === 400) {
      const ph_date = getDate();
      const ph_url = url;
      const ph_answer = false;
      const ph_json = err?.response?.data;

      const result = {
        ph_date,
        ph_url,
        ph_answer,
        ph_json,
      };

      return result;
    }

    console.log(err);

    const result = {
      ph_date: getDate(),
      ph_url: url,
      ph_answer: false,
      ph_json: `${err}`,
    };

    return result;
  }
}

/**
 * Функция по созданию колонки в Google Cloud BigTable
 * @param {*} bt_table_id
 */
async function BigTable_createFamily(bt_table_id = "DOC_MS4") {
  try {
    const bt_instance_id = env.MS4_GOOGLE_CLOUD_BIGTABLE_INSTANCE_ID;

    const bt_client = new Bigtable({
      projectId: env.MS4_GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: env.MS4_GOOGLE_CLOUD_BIGTABLE_SERVICE_EMAIL,
        private_key: env.MS4_GOOGLE_CLOUD_BIGTABLE_PRIVATE_KEY,
      },
    });
    const bt_instance = bt_client.instance(bt_instance_id);
    const bt_table = bt_instance.table(bt_table_id);

    await bt_table.createFamily("column-family-name");
    console.log(" [!] Создали колонку в BigTable");
  } catch (err) {
    console.log(err);
  }
}

/**
 * Функция удаляет таблицу в Google Cloud BigTable
 * @param {*} bt_table_id
 * @returns undefined
 */
async function BigTable_deleteTable(bt_table_id = "DOC_MS4") {
  try {
    const bt_instance_id = env.MS4_GOOGLE_CLOUD_BIGTABLE_INSTANCE_ID;

    const bt_client = new Bigtable({
      projectId: env.MS4_GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: env.MS4_GOOGLE_CLOUD_BIGTABLE_SERVICE_EMAIL,
        private_key: env.MS4_GOOGLE_CLOUD_BIGTABLE_PRIVATE_KEY,
      },
    });
    const bt_instance = bt_client.instance(bt_instance_id);
    const bt_table = bt_instance.table(bt_table_id);

    const is_table_exists = await BigTable_existsTable();
    if (is_table_exists) {
      await bt_table.delete();
    }
    console.log(" [!] Удалили таблицу BigTable");
  } catch (err) {
    console.log(err);
  }
}

/**
 * Функция создает таблицу в Google Cloud BigTable
 * @param {*} bt_table_id - имя таблицы
 * @returns
 */
async function BigTable_createTable(bt_table_id = "DOC_MS4") {
  try {
    const bt_instance_id = env.MS4_GOOGLE_CLOUD_BIGTABLE_INSTANCE_ID;

    const bt_client = new Bigtable({
      projectId: env.MS4_GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: env.MS4_GOOGLE_CLOUD_BIGTABLE_SERVICE_EMAIL,
        private_key: env.MS4_GOOGLE_CLOUD_BIGTABLE_PRIVATE_KEY,
      },
    });
    const bt_instance = bt_client.instance(bt_instance_id);
    const bt_table = bt_instance.table(bt_table_id);

    const result = await bt_table.create({
      name: bt_table_id,
      rule: {
        version: "1",
      },
    });

    console.log(" [!] Создали таблицу BigTable");

    return result;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Функция возвращает ответ о существовании таблицы Google Cloud BigTable
 * @returns boolean
 */
async function BigTable_existsTable(bt_table_id = "DOC_MS4") {
  try {
    const bt_instance_id = env.MS4_GOOGLE_CLOUD_BIGTABLE_INSTANCE_ID;

    const bt_client = new Bigtable({
      projectId: env.MS4_GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: env.MS4_GOOGLE_CLOUD_BIGTABLE_SERVICE_EMAIL,
        private_key: env.MS4_GOOGLE_CLOUD_BIGTABLE_PRIVATE_KEY,
      },
    });
    const bt_instance = bt_client.instance(bt_instance_id);
    const bt_table = bt_instance.table(bt_table_id);

    const [result] = await bt_table.exists();
    console.log(" [!] Узнали о существовании таблицы BigTable");
    return result;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Функция вставляет данные в Google Cloud BigTable
 * @param {*} table
 * @param {*} data
 * @returns undefined
 */
async function BigTable_insertIntoTable(
  data = {
    "column-family-name": {
      ph_date: getDate(),
      ph_answer: false,
      ph_url: "http://",
      ph_json: "{}",
    },
  },
  bt_table_id = "DOC_MS4"
) {
  try {
    const bt_instance_id = env.MS4_GOOGLE_CLOUD_BIGTABLE_INSTANCE_ID;

    const bt_client = new Bigtable({
      projectId: env.MS4_GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: env.MS4_GOOGLE_CLOUD_BIGTABLE_SERVICE_EMAIL,
        private_key: env.MS4_GOOGLE_CLOUD_BIGTABLE_PRIVATE_KEY,
      },
    });
    const bt_instance = bt_client.instance(bt_instance_id);
    const bt_table = bt_instance.table(bt_table_id);

    const key = new Date().toJSON();

    await bt_table.insert({ key, data });
    console.log(" [!] Вставили данные в таблицу BigTable");
  } catch (err) {
    console.log(err);
  }
}

/**
 * Функция возвращает массив данных из таблицы Google Cloud BigTable
 * @param {*} columns
 * @param {*} filter
 * @returns undefined
 */
async function BigTable_selectTable(
  columns = ["column-family-name"],
  filter = [],
  bt_table_id = "DOC_MS4"
) {
  try {
    const bt_instance_id = env.MS4_GOOGLE_CLOUD_BIGTABLE_INSTANCE_ID;

    const bt_client = new Bigtable({
      projectId: env.MS4_GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: env.MS4_GOOGLE_CLOUD_BIGTABLE_SERVICE_EMAIL,
        private_key: env.MS4_GOOGLE_CLOUD_BIGTABLE_PRIVATE_KEY,
      },
    });
    const bt_instance = bt_client.instance(bt_instance_id);
    const bt_table = bt_instance.table(bt_table_id);

    let rows = [];

    const stream = bt_table.createReadStream({
      columns,
      filter,
    });

    stream.on("error", console.error);

    for await (const row of stream) {
      rows.push({
        id: row.id,
        data: row.data,
      });
    }

    console.log(" [!] Получили строки таблицы BigTable");

    return rows;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Функция создает схему в Google Cloud BigQuery
 * @param {*} shema - датасет Google Cloud BigQuery
 * @returns undefined
 */
async function BigQuery_createSchema(shema = "RSiOT_PO4_190333_dataset") {
  try {
    const bigqueryClient = new BigQuery({
      projectId: env.MS4_GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: env.MS4_GOOGLE_CLOUD_BIGQUERY_SERVICE_EMAIL,
        private_key: env.MS4_GOOGLE_CLOUD_BIGQUERY_PRIVATE_KEY,
      },
    });

    const sqlQuery = `CREATE SCHEMA IF NOT EXISTS ${shema};`;

    const options = {
      query: sqlQuery,
      location: "US",
    };

    await bigqueryClient.query(options);
    console.log(" [!] Создали схему BigQuery");
  } catch (err) {
    console.log(err);
  }
}

/**
 * Функция удаляет схему в Google Cloud BigQuery
 * @param {*} shema - датасет Google Cloud BigQuery
 * @returns undefined
 */
async function BigQuery_dropSchema(shema = "RSiOT_PO4_190333_dataset") {
  try {
    const bigqueryClient = new BigQuery({
      projectId: env.MS4_GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: env.MS4_GOOGLE_CLOUD_BIGQUERY_SERVICE_EMAIL,
        private_key: env.MS4_GOOGLE_CLOUD_BIGQUERY_PRIVATE_KEY,
      },
    });

    const sqlQuery = `DROP SCHEMA IF EXISTS ${shema};`;

    const options = {
      query: sqlQuery,
      location: "US",
    };

    await bigqueryClient.query(options);
    console.log(" [!] Удалили схему BigQuery");
  } catch (err) {
    console.log(err);
  }
}

/**
 * Функция создает таблицу в Google Cloud BigQuery
 * @param {*} shema - датасет Google Cloud BigQuery
 * @param {*} table - таблица Google Cloud BigQuery
 * @returns undefined
 */
async function BigQuery_createTable(
  shema = "RSiOT_PO4_190333_dataset",
  table = "DOC_MS4"
) {
  try {
    const bigqueryClient = new BigQuery({
      projectId: env.MS4_GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: env.MS4_GOOGLE_CLOUD_BIGQUERY_SERVICE_EMAIL,
        private_key: env.MS4_GOOGLE_CLOUD_BIGQUERY_PRIVATE_KEY,
      },
    });

    const sqlQuery = `CREATE TABLE IF NOT EXISTS ${shema}.${table} (
      ph_date DATETIME,
      ph_answer BOOL,
      ph_url string,
      ph_json string
    );`;

    const options = {
      query: sqlQuery,
      location: "US",
    };

    await bigqueryClient.query(options);
    console.log(" [!] Создали таблицу BigQuery");
  } catch (err) {
    console.log(err);
  }
}

/**
 * Функция удаляет таблицу в Google Cloud BigQuery
 * @param {*} shema - датасет Google Cloud BigQuery
 * @param {*} table - таблица Google Cloud BigQuery
 * @returns undefined
 */
async function BigQuery_dropTable(
  shema = "RSiOT_PO4_190333_dataset",
  table = "DOC_MS4"
) {
  try {
    const bigqueryClient = new BigQuery({
      projectId: env.MS4_GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: env.MS4_GOOGLE_CLOUD_BIGQUERY_SERVICE_EMAIL,
        private_key: env.MS4_GOOGLE_CLOUD_BIGQUERY_PRIVATE_KEY,
      },
    });

    const sqlQuery = `DROP TABLE IF EXISTS ${shema}.${table};`;

    const options = {
      query: sqlQuery,
      location: "US",
    };

    await bigqueryClient.query(options);
    console.log(" [!] Удалили таблицу BigQuery");
  } catch (err) {
    console.log(err);
  }
}

/**
 * Функция созвращает массив данных из таблицы Google Cloud BigQuery
 * @param {*} shema - датасет Google Cloud BigQuery
 * @param {*} table - таблица Google Cloud BigQuery
 * @returns array
 */
async function BigQuery_selectTable(
  shema = "RSiOT_PO4_190333_dataset",
  table = "DOC_MS4"
) {
  try {
    const bigqueryClient = new BigQuery({
      projectId: env.MS4_GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: env.MS4_GOOGLE_CLOUD_BIGQUERY_SERVICE_EMAIL,
        private_key: env.MS4_GOOGLE_CLOUD_BIGQUERY_PRIVATE_KEY,
      },
    });

    const sqlQuery = `SELECT * FROM \`${shema}.${table}\`;`;

    const options = {
      query: sqlQuery,
      location: "US",
    };

    const [rows] = await bigqueryClient.query(options);

    let array = [];

    rows.forEach((row) => {
      array.push(row);
    });

    console.log(" [!] Выполнили запрос строк таблицы BigQuery");

    return array;
  } catch (err) {
    console.log(err);
    return [];
  }
}

/**
 * Функция вставляет данные в таблицу Google Cloud BigQuery
 * @param {*} params - данные для insert
 * @param {*} shema - датасет Google Cloud BigQuery
 * @param {*} table - таблица Google Cloud BigQuery
 * @returns undefined
 */
async function BigQuery_insertIntoTable(
  params = {},
  shema = "RSiOT_PO4_190333_dataset",
  table = "DOC_MS4"
) {
  try {
    const bigqueryClient = new BigQuery({
      projectId: env.MS4_GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: env.MS4_GOOGLE_CLOUD_BIGQUERY_SERVICE_EMAIL,
        private_key: env.MS4_GOOGLE_CLOUD_BIGQUERY_PRIVATE_KEY,
      },
    });

    const sqlQuery = `INSERT INTO \`${shema}.${table}\` VALUES
    ("${params.ph_date}", ${params.ph_answer}, "${
      params.ph_url
    }", "${JSON.stringify(params.ph_json).replaceAll('"', "'")}");`;

    const options = {
      query: sqlQuery,
      location: "US",
    };

    await bigqueryClient.query(options);
    console.log(" [!] Вставили данные в таблицу BigQuery");
  } catch (err) {
    console.log(err);
  }
}
