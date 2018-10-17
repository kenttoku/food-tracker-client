// import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import requiresLogin from './requires-login';
// // Actions
// import {
//   fetchAllDiaries,
//   fetchDiary,
//   setEntries,
//   deleteFoodFromDiary
// } from '../actions/diary-actions';

// export class Archive extends React.Component {
//   componentDidMount() {
//     this.props.dispatch(fetchDiary(this.props.date))
//       .then(() => this.props.dispatch(setEntries()));
//     this.props.dispatch(fetchAllDiaries())
//       .then(res => console.log(res));
//   }

//   deleteEntry(entryId) {
//     this.props.dispatch(deleteFoodFromDiary(entryId))
//       .then(() => this.props.dispatch(setEntries()));
//   }

//   render() {
//     const entriesElements = this.props.entries.map(entry => {
//       return (<li key={entry._id}>{entry.food.name} -
//         <Link to={`/dashboard/edit/${this.props.date}/${entry._id}/`}>Edit</Link>
//         <span
//           className="deleteEntryButton"
//           onClick={ () => this.deleteEntry(entry._id)}
//         >
//           [delete]
//         </span>
//       </li>);
//     });

//     return (
//       <div className="dashboard">
//         <div className="dashboard-username">
//           Username: {this.props.username}
//         </div>
//         <div className="entries">
//           <ul>{entriesElements}</ul>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state, props) => {
//   return {
//     date: props.match.params.date,
//     entries: state.diary.entries,
//     username: state.auth.currentUser.username
//   };
// };

// export default requiresLogin()(connect(mapStateToProps)(Archive));
