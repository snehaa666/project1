// Global app state 
let state = {
  editingId: null,   // ID of the student OR teacher being edited
  students: [],      // list of all students
  teachers: []       // list of all teachers
};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}
