import React from 'react';

import { useMasterData } from '../../context/MasterDataContext';

const CashCreate = () => {
  const { customers, accounts } = useMasterData();

  return (
    <div className="cash-create">
      <header className="cash-create__header">
        <div className="cash-create__nav">
          <button type="button" className="cash-create__switch">〈 上月</button>
          <h2 className="cash-create__title">114年9月 零用金記錄</h2>
          <button type="button" className="cash-create__switch">下月 〉</button>
        </div>
      </header>

      <section className="cash-create__card">
        <header className="cash-create__cardHeader">
          <h3>新增零用金記錄</h3>
        </header>
        <form className="cash-create__form">
          <div className="cash-create__grid">
            <div className="cash-create__field">
              <label htmlFor="cash-record-date">登記日期</label>
              <div className="cash-create__inputGroup">
                <input id="cash-record-date" className="cash-create__input" placeholder="114年8月27日 或 0827" />
                <button type="button" className="cash-create__ghost">選擇</button>
                <button type="button" className="cash-create__ghost cash-create__ghost--primary">今日</button>
              </div>
            </div>

            <div className="cash-create__field">
              <label htmlFor="cash-code">代號</label>
              <input
                id="cash-code"
                className="cash-create__input"
                placeholder="請輸入代號"
                list="customer-codes"
              />
            </div>

            <div className="cash-create__field">
              <label htmlFor="cash-account">會計科目</label>
              <input
                id="cash-account"
                className="cash-create__input"
                placeholder="請輸入或選擇會計科目"
                list="account-names"
              />
            </div>

            <div className="cash-create__field">
              <label htmlFor="cash-book-date">帳務日期</label>
              <div className="cash-create__inputGroup">
                <input id="cash-book-date" className="cash-create__input" placeholder="114年8月27日 或 5月6日" />
                <button type="button" className="cash-create__ghost">選擇</button>
                <button type="button" className="cash-create__ghost cash-create__ghost--primary">今日</button>
              </div>
            </div>

            <div className="cash-create__field">
              <label htmlFor="cash-memo">備註</label>
              <input id="cash-memo" className="cash-create__input" placeholder="備註說明" />
            </div>

            <div className="cash-create__field cash-create__field--upload">
              <label htmlFor="cash-receipt">發票/收據</label>
              <button type="button" className="cash-create__upload">
                📷 上傳
              </button>
            </div>

            <div className="cash-create__field">
              <label htmlFor="cash-income">收入金額</label>
              <input id="cash-income" className="cash-create__input" defaultValue="0" />
            </div>

            <div className="cash-create__field">
              <label htmlFor="cash-expense">支出金額</label>
              <input id="cash-expense" className="cash-create__input" defaultValue="0" />
            </div>

            <div className="cash-create__field">
              <label htmlFor="cash-advance">代墊款</label>
              <input id="cash-advance" className="cash-create__input" defaultValue="0" />
            </div>

            <div className="cash-create__field">
              <label htmlFor="cash-balance">剩餘金額</label>
              <input id="cash-balance" className="cash-create__input" defaultValue="58,792" />
            </div>
          </div>

          <div className="cash-create__submitRow">
            <button type="submit" className="cash-create__submit">＋ 新增記錄</button>
          </div>
        </form>
      </section>

      <datalist id="customer-codes">
        {customers.map((customer) => (
          <option key={customer.code} value={customer.code}>
            {customer.name}
          </option>
        ))}
      </datalist>

      <datalist id="account-names">
        {accounts.map((account) => (
          <option key={`${account.mapping}-${account.name}`} value={account.name}>
            {account.mapping}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default CashCreate;
