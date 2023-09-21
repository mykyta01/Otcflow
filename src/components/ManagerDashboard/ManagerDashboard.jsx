import './ManagerDashboard.scss';
import React, { useState, useEffect } from 'react';

const ManagerDashboard = () => {
  const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  // Mock traders data with their total_score
  const [traders, setTraders] = useState([
    { id: 1, name: 'Harry Potter', total_score: 0 },
    { id: 2, name: 'Hermione Granger', total_score: 0 },
    { id: 3, name: 'Ron Weasley', total_score: 0 },
    { id: 4, name: 'Albus Dumbledore', total_score: 0 },
    { id: 5, name: 'Severus Snape', total_score: 0 },
    { id: 6, name: 'Sirius Black', total_score: 0 },
    { id: 7, name: 'Voldemort (Tom Riddle)', total_score: 0 },
    { id: 8, name: 'Luna Lovegood', total_score: 0 },
    { id: 9, name: 'Draco Malfoy', total_score: 0 },
    { id: 10, name: 'Hagrid (Rubeus Hagrid)', total_score: 0 },
    { id: 11, name: 'Ginny Weasley', total_score: 0 },
    { id: 12, name: 'Fred Weasley', total_score: 0 },
    { id: 13, name: 'George Weasley', total_score: 0 },
    { id: 14, name: 'Percy Weasley', total_score: 0 },
    { id: 15, name: 'Charlie Weasley', total_score: 0 },
    { id: 16, name: 'Bill Weasley', total_score: 0 },
    { id: 17, name: 'Molly Weasley', total_score: 0 },
    { id: 18, name: 'Arthur Weasley', total_score: 0 },
    { id: 19, name: 'Minerva McGonagall', total_score: 0 },
    { id: 20, name: 'Lucius Malfoy', total_score: 0 },
    { id: 21, name: 'Narcissa Malfoy', total_score: 0 },
    { id: 22, name: 'Bellatrix Lestrange', total_score: 0 },
    { id: 23, name: 'Dolores Umbridge', total_score: 0 },
    { id: 24, name: 'Alastor Moody', total_score: 0 },
    { id: 25, name: 'Nymphadora Tonks', total_score: 0 },
    { id: 26, name: 'Remus Lupin', total_score: 0 },
    { id: 27, name: 'Neville Longbottom', total_score: 0 },
    { id: 28, name: 'Cedric Diggory', total_score: 0 },
    { id: 29, name: 'Cho Chang', total_score: 0 },
    { id: 30, name: 'Fleur Delacour', total_score: 0 },
    { id: 31, name: 'Viktor Krum', total_score: 0 },
    { id: 32, name: 'Peter Pettigrew', total_score: 0 },
    { id: 33, name: 'James Potter', total_score: 0 },
    { id: 34, name: 'Lily Potter', total_score: 0 },
    { id: 35, name: 'Cornelius Fudge', total_score: 0 },
    { id: 36, name: 'Rufus Scrimgeour', total_score: 0 },
    { id: 37, name: 'Gilderoy Lockhart', total_score: 0 },
    { id: 38, name: 'Dobby', total_score: 0 },
    { id: 39, name: 'Kreacher', total_score: 0 },
    { id: 40, name: 'Moaning Myrtle', total_score: 0 },
    { id: 41, name: 'Peeves', total_score: 0 },
    { id: 42, name: 'Nearly Headless Nick', total_score: 0 },
    { id: 43, name: 'Argus Filch', total_score: 0 },
    { id: 44, name: 'Professor Flitwick', total_score: 0 },
    { id: 45, name: 'Professor Sprout', total_score: 0 },
    { id: 46, name: 'Professor Slughorn', total_score: 0 },
    { id: 47, name: 'Professor Trelawney', total_score: 0 },
    { id: 48, name: 'Dean Thomas', total_score: 0 },
    { id: 49, name: 'Seamus Finnigan', total_score: 0 },
    { id: 50, name: 'Lavender Brown', total_score: 0 },
    { id: 51, name: 'Parvati Patil', total_score: 0 },
    { id: 52, name: 'Padma Patil', total_score: 0 },
    { id: 53, name: 'Oliver Wood', total_score: 0 },
    { id: 54, name: 'Lee Jordan', total_score: 0 },
    { id: 55, name: 'Katie Bell', total_score: 0 },
    { id: 56, name: 'Angelina Johnson', total_score: 0 },
    { id: 57, name: 'Alicia Spinnet', total_score: 0 },
    { id: 58, name: 'Colin Creevey', total_score: 0 },
    { id: 59, name: 'Dennis Creevey', total_score: 0 },
    { id: 60, name: 'Ernie Macmillan', total_score: 0 },
    { id: 61, name: 'Justin Finch-Fletchley', total_score: 0 },
    { id: 62, name: 'Hannah Abbott', total_score: 0 },
    { id: 63, name: 'Susan Bones', total_score: 0 },
    { id: 64, name: 'Zacharias Smith', total_score: 0 },
    { id: 65, name: 'Marcus Flint', total_score: 0 },
    { id: 66, name: 'Millicent Bulstrode', total_score: 0 },
    { id: 67, name: 'Pansy Parkinson', total_score: 0 },
    { id: 68, name: 'Gregory Goyle', total_score: 0 },
    { id: 69, name: 'Vincent Crabbe', total_score: 0 },
    { id: 70, name: 'Barty Crouch Sr.', total_score: 0 },
    { id: 71, name: 'Barty Crouch Jr.', total_score: 0 },
    { id: 72, name: 'Ludo Bagman', total_score: 0 },
    { id: 73, name: 'Kingsley Shacklebolt', total_score: 0 },
    { id: 74, name: 'Andromeda Tonks', total_score: 0 },
    { id: 75, name: 'Ted Tonks', total_score: 0 },
    { id: 76, name: 'Hedwig', total_score: 0 },
    { id: 77, name: 'Buckbeak', total_score: 0 },
    { id: 78, name: 'Professor Grubbly-Plank', total_score: 0 },
    { id: 79, name: 'Professor Binns', total_score: 0 },
    { id: 80, name: 'Olympe Maxime', total_score: 0 },
  ].map((trader) => ({
    ...trader,
    timeToCompleteForm: getRandomValue(5, 30),
    formAccuracy: getRandomValue(80, 100),
    volumeOfTrades: getRandomValue(1, 100),
    clientSatisfactionScore: getRandomValue(1, 10),
    errorRate: getRandomValue(0, 5),
    amendmentRate: getRandomValue(0, 5),
    interventionRate: getRandomValue(0, 5),
    escalationRate: getRandomValue(0, 5),
    contractCompletionRate: getRandomValue(70, 100),
    workflowDuration: getRandomValue(1, 5),
    costPerContract: getRandomValue(50, 500),
  })));

  const [shouldUpdate, setShouldUpdate] = useState(true); 

  useEffect(() => {
    // Compute the total score for each trader based on the other metrics
    if (shouldUpdate) {
    const updatedTraders = traders.map((trader) => {
      const {
        timeToCompleteForm,
        formAccuracy,
        volumeOfTrades,
        clientSatisfactionScore,
        errorRate,
        amendmentRate,
        interventionRate,
        escalationRate,
        contractCompletionRate,
        workflowDuration,
        costPerContract,
      } = trader;
      
      trader.total_score = timeToCompleteForm + formAccuracy + volumeOfTrades + 
                            clientSatisfactionScore + errorRate + amendmentRate + 
                            interventionRate + escalationRate + contractCompletionRate +
                            workflowDuration + costPerContract;
      
      return trader;
    });
    

    const sortedTraders = updatedTraders.sort((a, b) => b.total_score - a.total_score);
    
    setTraders(sortedTraders);

    setShouldUpdate(false); // set the flag to false after updating
  }
}, [traders, shouldUpdate]);

  return (
    <div className='manager-container'>
      <h1 className='manager-title'>Manager Dashboard</h1>
      <table>
        <thead>
          <tr>
          <th title="Order number">N.</th>
          <th title="Name of the Trader">Trader Name</th>
          <th title="Total score from all metrics">Total Score</th>
          <th title="Measures how long it takes a trader to fill out the initial form for a trade. A shorter time could indicate efficiency but needs to be balanced with accuracy metrics.">Time to Complete Form</th>
          <th title="Percentage of fields filled in correctly as judged by legal review or other means. High accuracy is important to avoid legal complications.">Form Accuracy</th>
          <th title="The number of trades a trader handles within a specific period can be an indicator of productivity.">Volume of Trades</th>
          <th title="Post-transaction surveys from clients can provide insights into the quality of the trade initiation.">Client Satisfaction Score</th>
          <th title="Number or percentage of errors in form submissions, requiring legal to spend extra time for correction.">Error Rate</th>
          <th title="Number of times a trade form has to be revised before it is converted into a contract">Amendment Rate</th>
          <th title="Number of times a manager has to intervene in the contract process per a certain number of contracts.">Intervention Rate</th>
          <th title="Number of times issues are escalated beyond the legal team for senior management or specialized review.">Escalation Rate</th>
          <th title="Percentage of initiated contracts that reach successful completion within a given time frame.">Contract Completion Rate</th>
          <th title="Time from initiation of form to the completion of legal review.">Workflow Duration</th>
          <th title="Overall resource cost involved in taking a contract from initiation to completion, to understand ROI.
">Cost per Contract</th>
          </tr>
        </thead>
        <tbody>
          {traders.map((trader, index) => (
            <tr key={trader.id} style={index < 10 ? { backgroundColor: 'rgb(163, 221, 163)' } : 
            (index >= traders.length - 10) ? { backgroundColor: 'lightcoral' } : {}}>
              <td>{index + 1}</td>
              <td>{trader.name}</td>
              <td>{trader.total_score}</td>
              <td>{trader.timeToCompleteForm}</td>
              <td>{trader.formAccuracy}</td>
              <td>{trader.volumeOfTrades}</td>
              <td>{trader.clientSatisfactionScore}</td>
              <td>{trader.errorRate}</td>
              <td>{trader.amendmentRate}</td>
              <td>{trader.interventionRate}</td>
              <td>{trader.escalationRate}</td>
              <td>{trader.contractCompletionRate}</td>
              <td>{trader.workflowDuration}</td>
              <td>{trader.costPerContract}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerDashboard;
