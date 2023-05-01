import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Draggable from "react-draggable";
import { useLocation } from "react-router-dom";

const API = axios.create({
  baseURL: "https://cs565-backend-2023.herokuapp.com/",
});

type Symbol = {
  name: string;
  pitch?: number;
};

type MeasureResponse = {
  userId: string;
  symbols: Symbol[];
};

type RequestBody = {
  measureId: string;
  measureResponse: MeasureResponse;
};

type Note = {
  type: number;
  x: number;
  y: number;
};

const types = [0, 1, 2, 3, 4, 5];
const typesName = [
  "whole_note",
  "half_note",
  "quarter_note",
  "whole_rest",
  "half_rest",
  "quarter_rest",
];

const notePos = [375, 350, 325, 300, 275, 250, 225, 200, 175];
const pitchIdx = new Map(notePos.map((val, idx) => [val, idx]));

const ParticipantActivityScreen = () => {
  const [measure, setMeasure] = useState({ _id: "", image: "" });
  const [num_submission, setNum_submission] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeasure();
  }, [num_submission]);

  const fetchMeasure = () => {
    API.get("api/measuretask")
      .then((response) => {
        const data = response.data;
        let u8 = new Uint8Array(data.data.image.data);
        let decoder = new TextDecoder("utf8");
        let b64 = decoder.decode(u8);
        setMeasure({
          _id: data.data._id,
          image: `data:image/png;base64,${b64}`,
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleSubmitClick = () => {
    setNum_submission((prevState) => prevState + 1);
    const symbols: Symbol[] = notes.map((note: Note) => {
      if (note.type === 0 || note.type === 1 || note.type === 2) {
        return {
          name: String(typesName[note.type]),
          pitch: pitchIdx.get(note.y),
        };
      } else {
        return {
          name: String(typesName[note.type]),
        };
      }
    });
    const requestBody: RequestBody = {
      measureId: measureId,
      measureResponse: {
        userId: userId,
        symbols: symbols,
      },
    };
    console.log(requestBody);
    API.post("api/measureresponse", requestBody)
      .then((response) => {
        // console.log(response.data); // handle the response data as needed
        resetMeasure();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleFinishClick = () => {
    navigate("/thankyou");
  };

  const location = useLocation();
  const userId = location.state?.userId;
  //   console.log("userId: " + userId);

  const measureId = measure._id;
  //   console.log("measureId: " + measureId);

  //   const [notes, setNotes] = useState([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const handleNoteDrag = (
    index: number,
    position: { x: number; y: number }
  ) => {
    const { x, y } = position;
    let snappedY = Math.round(y / 25) * 25; // Snap to 25-pixel increments
    // set boundary for the note
    if (snappedY < 175) {
      snappedY = 175;
    }
    if (snappedY > 375) {
      snappedY = 375;
    }
    const newNotes = [...notes];
    newNotes[index].y = snappedY;
    setNotes(newNotes);
  };

  const addNote = (noteType: number) => {
    let currNoteCnt = notes.length;
    if (currNoteCnt === 0) {
      if (noteType === 3) {
        setNotes([{ x: 70, y: 225, type: noteType }]);
      } else if (noteType === 4) {
        setNotes([{ x: 70, y: 250, type: noteType }]);
      } else if (noteType === 5) {
        setNotes([{ x: 70, y: 275, type: noteType }]);
      } else {
        setNotes([{ x: 70, y: 350, type: noteType }]);
      }
    } else if (currNoteCnt < 4) {
      const newNotes = [...notes];
      if (noteType === 3) {
        setNotes([
          ...newNotes,
          { x: newNotes[newNotes.length - 1].x + 180, y: 225, type: noteType },
        ]);
      } else if (noteType === 4) {
        setNotes([
          ...newNotes,
          { x: newNotes[newNotes.length - 1].x + 180, y: 250, type: noteType },
        ]);
      } else if (noteType === 5) {
        setNotes([
          ...newNotes,
          { x: newNotes[newNotes.length - 1].x + 180, y: 275, type: noteType },
        ]);
      } else {
        setNotes([
          ...newNotes,
          { x: newNotes[newNotes.length - 1].x + 180, y: 350, type: noteType },
        ]);
      }
    }
  };

  const resetMeasure = () => {
    setNotes([]);
  };

  function deleteLastNote() {
    setNotes((prevNotes) => prevNotes.slice(0, -1));
  }

  const getNoteSymbol = (type: number) => {
    switch (type) {
      case 0:
        return "𝅝"; // Full note
      case 1:
        return "𝅗𝅥"; // Half note
      case 2:
        return "𝅘𝅥"; // Quarter note
      case 3:
        return "𝄻"; // Full rest
      case 4:
        return "𝄼"; // Half rest
      case 5:
        return "𝄽"; // Quarter rest
      default:
        return "";
    }
  };

  return (
    <React.Fragment>
      {/* <section className="section-02-participant-activity-screen"> */}
      <div className="act-container">
        <div className="response-counter">
          {num_submission < 4 ? (
            <h3>Please submit at least 4 responses </h3>
          ) : (
            <h3>
              Thank you for your participation, Now you can continue or click
              the "Finish" button to leave
            </h3>
          )}
        </div>

        {num_submission >= 4 ? (
          <button
            onClick={handleFinishClick}
            style={{ fontSize: "20px", padding: "10px 20px" }}
          >
            Finish
          </button>
        ) : null}

        <div className="image-preview">
          {measure.image !== "" ? (
            <img src={measure.image} alt="Measure Image" />
          ) : null}
        </div>

        <div className="music-staff">
          {/* Render staff lines */}
          <div className="staff">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="staff-line" />
            ))}
          </div>
          {/* <div className="note">{getNoteSymbol(6)}</div> */}
          {/* Render draggable note */}
          {notes.map(({ x, y, type }, index) =>
            type < 3 || type > 5 ? (
              <Draggable
                key={index}
                axis="y"
                bounds="parent"
                position={{ x, y }}
                onDrag={(e, position) => handleNoteDrag(index, position)}
              >
                <div className="note">{getNoteSymbol(type)}</div>
              </Draggable>
            ) : (
              <Draggable
                key={index}
                axis="y"
                bounds="parent"
                position={{ x, y }}
                onDrag={(e, position) => handleNoteDrag(index, position)}
                disabled={true}
              >
                <div className="note">{getNoteSymbol(type)}</div>
              </Draggable>
            )
          )}

          {/* Render buttons */}
          <div className="note-buttons">
            {types.map((note, index) => (
              <button
                key={index}
                onClick={() => addNote(note)}
                style={{ marginRight: "10px" }}
              >
                {/* <img src={`img${note+1}.png`} alt="Note icon" style={{ width: '50px', height: '50px' }}/> */}
                <img
                  src={process.env.PUBLIC_URL + `/notes/img${note + 1}.png`}
                  alt="Note icon"
                  style={{ width: "50px", height: "50px" }}
                />

                {note + 1}
              </button>
            ))}
          </div>
          <div className="button-container" style={{ marginTop: "20px" }}>
            <div className="reset-button">
              <button
                onClick={() => deleteLastNote()}
                style={{ fontSize: "20px", padding: "10px 20px" }}
              >
                Delete
              </button>
            </div>

            <div className="reset-button">
              <button
                onClick={() => resetMeasure()}
                style={{ fontSize: "20px", padding: "10px 20px" }}
              >
                Reset
              </button>
            </div>
            <div className="submit-finish">
              <button
                onClick={handleSubmitClick}
                style={{ fontSize: "20px", padding: "10px 20px" }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </section> */}
    </React.Fragment>
  );
};

export default ParticipantActivityScreen;
