import React from 'react';
import './DayPage.css'; 

const DayPage = ({ dayName, data, collectPointData, accumulatedResidueData }) => {
  if (!data || !collectPointData || !accumulatedResidueData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p className='dinamica'><b>Dinâmica das Roletas</b></p>
      <div className="grid-container">
        {/* Render Roletas */}
        {data.map((roulette, index) => (
          <div key={index} className="grid-item">
            <h3>{roulette.RouletteName}</h3>
            <div className="scroll-container">
              <table>
                <thead>
                  <tr>
                    <th>Brinde</th>
                    <th>Est. Inicial</th>
                    <th>Saídas</th>
                    <th>Acumulados</th>
                    <th>Est. Atual</th>
                  </tr>
                </thead>
                <tbody>
                  {roulette.Gifts.map((gift, giftIndex) => (
                    <tr key={giftIndex}>
                      <td>{gift.GiftName}</td>
                      <td>{gift.Consolidated.StartingInventory}</td>
                      <td className="red">{gift.Consolidated.RescuedAward}</td>
                      <td className="orange">{gift.Consolidated.LostAward}</td>
                      <td>{gift.Consolidated.CurrentInventory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <p className='dinamica'><b>Dinâmica dos Pontos de Coleta</b></p>
      <div className="grid-container">
        {/* Render Pontos de Coleta */}
        {collectPointData.map((point, index) => (
          <div key={index} className="grid-item">
            <h3>{point.CollectPointName}</h3>
            <div className="scroll-container">
              <table className='tableBrindes'>
                <thead>
                  <tr>
                    <th>Brinde</th>
                    <th>Est. Inicial</th>
                    <th>Saídas</th>
                    <th>Transfs. Saída</th>
                    <th>Transfs. Entrada</th>
                    <th>Est. Atual</th>
                  </tr>
                </thead>
                <tbody>
                  {point.Gifts.map((gift, giftIndex) => (
                    <tr key={giftIndex}>
                      <td>{gift.GiftName}</td>
                      <td>{gift.Consolidated.StartingInventory}</td>
                      <td className="red">{gift.Consolidated.ConversionMade}</td>
                      <td className="red">{gift.Consolidated.OutgoingTransferred}</td>
                      <td className="green">{gift.Consolidated.IncomingTransferred}</td>
                      <td>{gift.Consolidated.CurrentInventory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Resíduo Acumulado correspondente ao Ponto de Coleta */}
            {accumulatedResidueData[index] && (
              <div className="accumulated-residue">
                <strong>Resíduo Acumulado:</strong> {accumulatedResidueData[index].AccumulatedResidue}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayPage;
