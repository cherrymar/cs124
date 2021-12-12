import react from 'react'




function SignedInApp(props) {
  
    const query = db.collection(COLLECTION).where('owner', "==", props.user.uid);
    const [value, loading, error] = useCollection(query);
  
      function handleDeletePerson(personId) {
          db.collection(COLLECTION).doc(personId).delete().catch((error) => {
              console.error("Error deleting document: ", error);
          });
      }
  
      function handleAddPerson() {
          const newId = generateUniqueID();
          db.collection(COLLECTION).doc(newId).set({
              id: newId,
              firstName: "",
              lastName: "",
              email: "",
              owner: props.user.uid
          }).catch((error) => {
          console.error("Error writing document: ", error);
          })
      }
  
      function handlePersonFieldChanged (personId, field, value) {
          // const person = people.find(p => p.id === personId);
          // if (person) {
          //     person[field] = value;
          // }
          // const doc = db.collection(collectionName).doc(personId);
          // doc.update({
          //     [field]: value,
          // }).catch((error) => {
          //     console.error("Error updating document: ", error);
          // })
      }
  
    let people = null;
    if (error) {
      return <p>error useCollection: {error.message}</p>
    }
    if (value) {
      people = value.docs.map((doc) => {
        return {...doc.data()}
      });
    }
  
    return <div>
      {loading && <h1>Loading</h1>}
      {people && <div>Yay</div>
      // <People list={people}
      //                    onDeletePerson={handleDeletePerson}
      //                    onAddPerson={handleAddPerson}
      //                    onPersonFieldChanged={handlePersonFieldChanged}
      // />
      }
    </div>;
    
    
  }