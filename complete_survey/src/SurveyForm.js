import React,{useState,useEffect} from 'react';
import './style.css';

function SurveyForm() {

  const [questionsArray, setQuestionsArray] = useState([]);

  useEffect(() =>{
      fetch('http://localhost:3001/Questions/')
    .then(response => response.json())
    .then(responseJSON => {
      const questionsArray = responseJSON.map(question => question.question)
      setQuestionsArray(questionsArray);        
    })

    .catch(error => console.error(error));
  },[]);

  //const questionLabel = document.getElementById('qst-label');
  const [currentPage, setCurrentPage] = useState(1);

  // State for the first page
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [residence,setResidence] = useState('');

  // State for the second page
  const [interests, setInterests] = useState([]);

  // State for the third page
  const [comments, setComments] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleInterestsChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setInterests((prevInterests) => [...prevInterests, value]);
    } else {
      setInterests((prevInterests) =>
        prevInterests.filter((interest) => interest !== value)
      );
    }
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleResChange = (event) =>{
    setResidence(event.target.value)
  }

  const handleNextPage = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => prevPage + 1);
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      age,
      gender,
      residence,
      interests,
      comments,
    };
    setCurrentPage(4);
    console.log(JSON.stringify(data));
    
    
  };

  const renderPageOne = () => {

    return(
      <>
      <div className="form-group">
      <label id='qst-label' htmlFor={""}{...""}>{questionsArray[0]}</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label id='qst-label' htmlFor={""}{...""}>{questionsArray[1]}</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={handleAgeChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label id='qst-label' htmlFor="age">{questionsArray[2]}</label>
        <select id="gender" value={residence} onChange={handleResChange} className="form-control">
        <option value="">Select Residence</option>
           <option value="Johannesburg">Johannesburg</option>
           <option value="Centurion">Centurion</option>
           <option value="Midrand">Midrand</option>
          </select>
          
          
      </div>
      <div className="form-group">
        <label  id='qst-label' htmlFor="gender">{questionsArray[3]}</label>
        <select id="gender" value={gender} onChange={handleGenderChange} className="form-control">
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleNextPage}>Next</button>
    </>
    )

};

  const renderPageTwo = () => {
  return (
    <>
      <div className="form-group">
        <label id='qst-label' >{questionsArray[4]}</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              id="interests-sports"
              value="sports"
              checked={interests.includes("sports")}
              onChange={handleInterestsChange}
            />
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              id="interests-music"
              value="music"
              checked={interests.includes("music")}
              onChange={handleInterestsChange}
            />
            Music
          </label>
          <label>
            <input
              type="checkbox"
              id="interests-travel"
              value="travel"
              checked={interests.includes("travel")}
              onChange={handleInterestsChange}
            />
            Travel
          </label>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleNextPage}>
        Next
      </button>
    </>
  );
};

      
  const renderPageThree = () => {
            
   return(
    <>
    <div className="form-group">
    <label  id='qst-label' htmlFor="comments">{questionsArray[5]}</label>
      <div className='comment-group'>
        <textarea id="comments" value={comments} onChange={handleCommentsChange} />
        <button type='submit' onClick={handleSubmit}{...handleNextPage}>Submit</button>
      </div>

      </div>
    </>
   );
  }

  const renderPageFour = () => {
    // Create a CSV string from the survey data
    const csv = `Name,Age,Gender,Interests,Residence,Comments\n${name},${age},${gender},"${interests.join(',')}",${residence},${comments}`;
  
    // Create a Blob object from the CSV string
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
    // Create a URL for the Blob object
    const url = URL.createObjectURL(blob);
  
    // Function to download the CSV file
    const downloadCsv = () => {
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'survey.csv');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    return (
      <>
        <h2>Responses</h2>
        <p><b>Name: </b>{name}</p>
        <p><b>Age: </b>{age}</p>
        <p><b>Gender: </b>{gender}</p>
        <p><b>Residence: </b>{residence}</p>
        <p><b>Interests: </b>{interests.join(',')}</p>
        <p><b>Comments: </b>{comments}</p>
        <button className="btn btn-primary" onClick={downloadCsv}>
          Download CSV
        </button>
      </>
    );
  };
  
  
return (
  <div>
    {currentPage === 1 && renderPageOne()}
    {currentPage === 2 && renderPageTwo()}
    {currentPage === 3 && renderPageThree()}
    {currentPage === 4 && renderPageFour()}
  </div>
);

}


export default SurveyForm;