import React, { useState } from "react";
import { Modal, Button, Text, Box, Spinner, ProgressBar, ButtonGroup } from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";
import { ButtonIcon, ButtonPressIcon } from "@shopify/polaris-icons";
import { action } from "../route";

function ColorSelectionPopup({ onClose, onColorSelect }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const colors = [
    {
      colortext: "Green",
      link: "https://res.cloudinary.com/dvcksw7qc/image/upload/v1709960074/green_yunyvi.png",
    },
    {
      colortext: "Red",
      link: "https://res.cloudinary.com/dvcksw7qc/image/upload/v1709960075/brush-xxl_dmeqof.png",
    },
    {
      colortext: "Yellow",
      link: "https://res.cloudinary.com/dvcksw7qc/image/upload/v1709960075/brush-xxl_1_velkt6.png",
    },
    {
      colortext: "Blue",
      link: "https://res.cloudinary.com/dvcksw7qc/image/upload/v1709960075/blue_l7nyps.png",
    },
  ];
  const qrCode = useLoaderData();

  

  const simulateDownload = async () => {
    setLoading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10; 
      setDownloadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setLoading(false);
        onColorSelect(selectedColor);
      }
    }, 500);
  };

  return (
    <Modal open={true} onClose={onClose} title="Choose Your Color">
      <Modal.Section>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "10px",
            flexWrap: "wrap",
            alignContent: "space-between",
            justifyContent: "space-evenly",
          }}
        >
          {colors.map(
            (
              colorData,
              index
            ) => (
              <Button
              key={index}
                onClick={simulateDownload}
                size="medium"
                textAlign="center"
                download
              >
                <img style={{ width: "30px" }} src={colorData.link} />
                <br />
                <Text
                  variant="headingsm"
                  as="h5"
                >
                  {colorData.colortext}
                </Text>
              </Button>
            )
          )}
        </div>
      </Modal.Section>

      {loading && (
        <Modal.Section>
          <Box>
            <ProgressBar progress={downloadProgress} animated tone="success" size="medium"/>
          </Box>
          <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "20px",
            flexWrap: "wrap",
            alignContent: "space-between",
            justifyContent: "space-evenly",
          }}
        >
            <Button  onClick={() => setLoading(false)} color={"green"}>
              Cancel
            </Button>
            <Button onClick={() => setLoading(false)} tone="success" download url={qrCode?.image} variant="primary">Download</Button>
         
          </div>
        </Modal.Section>
      )}
    </Modal>
  );
}

export default ColorSelectionPopup;
