import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { MODULES } from './modules';
import CashCreate from './cash/CashCreate';

interface FormPanelProps {
  moduleKey: string;
  formKey: string;
  moduleTitle: string;
  formTitle: string;
  modulePath: string;
}

const FormPanel: React.FC<FormPanelProps> = ({ moduleKey, formKey, moduleTitle, formTitle, modulePath }) => {
  if (moduleKey === 'cash' && formKey === 'cash-create') {
    return <CashCreate />;
  }

  return (
    <div className="panel-placeholder">
      <p className="panel-placeholder__title">{formTitle}</p>
      <p className="panel-placeholder__hint">
        這裡將顯示「{moduleTitle}」模組的「{formTitle}」操作介面。
        待需求確認後，可在此嵌入實際表單內容。
      </p>
      <Link className="panel-placeholder__link" to={modulePath}>
        前往模組頁面
      </Link>
    </div>
  );
};

const Home = () => {
  const [openModuleKey, setOpenModuleKey] = useState('');
  const openModule = useMemo(
    () => MODULES.find((module) => module.key === openModuleKey),
    [openModuleKey]
  );

  const [selectedFormKey, setSelectedFormKey] = useState('');
  const selectedForm = useMemo(
    () => openModule?.forms.find((form) => form.key === selectedFormKey),
    [openModule, selectedFormKey]
  );

  useEffect(() => {
    if (!openModule?.forms?.length) {
      setSelectedFormKey('');
      return;
    }
    const firstForm = openModule.forms[0];
    setSelectedFormKey(firstForm.key);
  }, [openModuleKey, openModule?.forms]);

  return (
    <section className="home-shell">
      <aside className="sidebar" aria-label="會計模組清單">
        <ul className="sidebar__modules">
          {MODULES.map((module) => {
            const isActiveModule = module.key === openModuleKey;
            return (
              <li key={module.key} className={`sidebar__module${isActiveModule ? ' is-active' : ''}`}>
                <button
                  type="button"
                  className="sidebar__moduleButton"
                  onClick={() => {
                    if (isActiveModule) {
                      setOpenModuleKey('');
                      setSelectedFormKey('');
                    } else {
                      setOpenModuleKey(module.key);
                      const firstForm = module.forms?.[0];
                      setSelectedFormKey(firstForm ? firstForm.key : '');
                    }
                  }}
                >
                  <span className="sidebar__icon" aria-hidden>{module.icon}</span>
                  <span className="sidebar__label">{module.title}</span>
                  <span className={`sidebar__chevron${isActiveModule ? ' is-open' : ''}`} aria-hidden>
                    ▾
                  </span>
                </button>
                {isActiveModule && module.forms?.length ? (
                  <ul className="sidebar__sublist">
                    {module.forms.map((form) => (
                      <li key={form.key}>
                        <button
                          type="button"
                          className={`sidebar__subButton${form.key === selectedForm?.key ? ' is-active' : ''}`}
                          onClick={() => setSelectedFormKey(form.key)}
                        >
                          {form.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="content">
        {openModule ? (
          <>
            <header className="content__header">
              <h1>{openModule.title}</h1>
              {selectedForm ? <p>{selectedForm.title}</p> : null}
            </header>

            <section className="content__panel">
              {selectedForm ? (
                <FormPanel
                  moduleKey={openModule.key}
                  formKey={selectedForm.key}
                  moduleTitle={openModule.title}
                  formTitle={selectedForm.title}
                  modulePath={openModule.path}
                />
              ) : (
                <div className="panel-placeholder">
                  <p className="panel-placeholder__hint">尚未選擇表單。</p>
                </div>
              )}
            </section>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default Home;
