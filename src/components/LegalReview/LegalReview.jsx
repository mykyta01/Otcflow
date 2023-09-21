import './LegalReview.scss';
import React, { useState, useRef } from 'react';
import mammoth from "mammoth";
import { Document, Packer, Paragraph } from "docx";


const LegalReview = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [isEscalated, setIsEscalated] = useState(false);
  const [isRevised, setIsRevised] = useState(false);
  const previewRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (
      selectedFile &&
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const reader = new FileReader();
      reader.onload = function (event) {
        mammoth
          .convertToHtml({ arrayBuffer: event.target.result })
          .then(displayResult)
          .catch(handleError);
      };
      reader.readAsArrayBuffer(selectedFile);
      setIsApproved(false);
    } else {
      alert("Please upload a .docx file");
    }
  };

  const displayResult = (result) => {
    setPreview(result.value);
  };

  const handleError = (err) => {
    console.log(err);
  };

  const handleSave = () => {
    // Create a new .docx document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph(previewRef.current.innerText),
          ],
        },
      ],
    });

    // Generate the document
    Packer.toBlob(doc).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "saved_document.docx";
      a.click();
    });
  };

  const handleApprove = () => {
    setIsApproved(true);
    setIsEscalated(false);
    setIsRevised(false);
    console.log('Document approved');
  };

  const handleEscalate = () => {
    setIsEscalated(true);
    setIsApproved(false);
    setIsRevised(false);
    console.log('Escalated to management');
  };

  const handleSendBack = () => {
    setIsRevised(true);
    setIsApproved(false);
    setIsEscalated(false);
    console.log('Sent back with revisions');
  };

  return (
    <div className="legal-container">
      <h1 className="legal-title">Legal Review</h1>
      <input
        className="legal-input"
        type="file"
        accept=".docx"
        onChange={handleFileChange}
      />

      {file && (
        <div>
          <div className="document-view">
            <h2>Document Preview:</h2>
            <div
              ref={previewRef}
              className="preview"
              dangerouslySetInnerHTML={{ __html: preview }}
            >
            </div>
            <button className="button" onClick={handleSave}>
              Save the attachments
            </button>

            <button className="button" onClick={handleApprove}>
              Approve all documents
            </button>

            <button className="button" onClick={handleEscalate}>
              Escalte to management
            </button>

            <button className="button" onClick={handleSendBack}>
              Send back with revisions
            </button>

            {isApproved && <p>Document is approved.</p>}
            {isEscalated && <p>Document is escalated to management.</p>}
            {isRevised && <p>Document is sent back with revisions.</p>}
            {!isApproved && !isEscalated && !isRevised && <p>Document is pending approval.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalReview;