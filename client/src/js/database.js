import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
	console.log("PUT to the database");
	const jateDb = await openDB("jate", 1);
	const tx = jateDb.transaction("jate", "readwrite");
	const store = tx.objectStore("jate");
	// The text editor has only one field of information that is repeatedly retrieved and updated.
	const request = store.put({ id: 1, value: content });
	const result = await request;
	console.log("Data saved to the database", result);
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
	console.log("GET from the database");
	const jateDb = await openDB("jate", 1);
	const tx = jateDb.transaction("jate", "readonly");
	const store = tx.objectStore("jate");
	// Use the .get() method to get the one text editor entry from the database.
	const request = store.get(1);
	const result = await request;
	result
		? console.log("Data retrieved from the database", result.value)
		: console.log("Data not found in the database");
	return result?.value;
};

initdb();
