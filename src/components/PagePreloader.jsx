import React, { useEffect } from 'react';
import Pace from 'pace-js';
import 'pace-js/themes/blue/pace-theme-flash.css';
import styled from 'styled-components';

const PreloaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff; /* Arka plan rengi */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Diğer bileşenlerin üzerinde olacak şekilde z-index ayarı */

  /* Spinner için stiller */
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.3); /* Spinner kenar rengi ve opaklık */
    border-top: 4px solid #3498db; /* Spinner üst kenar rengi */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite; /* Spinner dönme animasyonu */
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg); /* Dönme başlangıç noktası */
    }
    100% {
      transform: rotate(360deg); /* Dönme bitiş noktası */
    }
  }
`;

const PagePreloader = () => {
  useEffect(() => {
    Pace.start();
    return () => {
      Pace.stop();
    };
  }, []);

  return (
    <PreloaderWrapper>
      <div className="spinner"></div>
    </PreloaderWrapper>
  );
};

export default PagePreloader;
