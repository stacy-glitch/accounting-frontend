import React, { useRef, useState } from 'react';

import { useMasterData } from '../../context/MasterDataContext';

const VehicleTable = () => {
  const { vehicles, importVehicles } = useMasterData();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setError('');
      await importVehicles(file);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div className="maintenance-table">
      <header className="maintenance-table__header">
        <div>
          <h2>車輛資料管理</h2>
          <p>{vehicles.length === 0 ? '暫無車輛資料，請新增或上傳車輛表' : `共 ${vehicles.length} 台車輛`}</p>
        </div>
        <div className="maintenance-table__actions">
          <button type="button" className="maintenance-table__button maintenance-table__button--primary">
            ＋ 新增車輛
          </button>
          <button
            type="button"
            className="maintenance-table__button maintenance-table__button--upload"
            onClick={handleUploadClick}
          >
            📁 上傳車輛表
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="visually-hidden"
            onChange={handleFileChange}
          />
        </div>
      </header>

      {error && <p className="maintenance-table__error">{error}</p>}

      <table className="maintenance-table__table">
        <thead>
          <tr>
            <th>代號</th>
            <th>車牌號碼</th>
            <th>車型</th>
            <th>廠牌</th>
            <th>司機</th>
            <th>行照</th>
            <th>駕照</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <tr key={vehicle.code}>
                <td>{vehicle.code}</td>
                <td>{vehicle.plate}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.driver}</td>
                <td>{vehicle.license}</td>
                <td>{vehicle.permit}</td>
                <td>
                  <button type="button" className="maintenance-table__linkButton">
                    編輯
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="maintenance-table__empty">
                暫無車輛資料，請新增或上傳車輛表
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
