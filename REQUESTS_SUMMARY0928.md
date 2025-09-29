# JudaCargo Accounting — 需求整理（至目前）

以下彙整本次對前端專案的需求、介面目標與後續方向，方便下載備查。

## 介面更新
- 首頁新增 Hero 區塊，主題為「會計作業核心模組」，背景採綠色漸層。
- 首頁顯示 **七張模組卡片**，由共用設定 `MODULES` 驅動，每張卡片包含 emoji、標題、描述。
- 卡片列表下方預計還要擺放儀表板與其他表格（細節待後續提供）。
- 預計將儀表板區塊移到左側，七張卡片與表格位於右側/下方。

## 模組清單（首頁卡片）
1. 零用金管理系統（/cash）
2. 營業收入與銀行管理（/banking）
3. 薪資管理系統（/payroll）
4. 各項費用管理系統（/expenses）
5. 收支管理系統（/receivable）
6. 車輛成本管理（/vehicle-cost）
7. 資料維護系統（/data-maintenance）

> 「完整資料備份」與「資料匯入」卡片不納入首頁。

## 子頁骨架
- 各模組 `index` 頁面已更新敘述與返回首頁按鈕。
- 目前為靜態骨架，等待後續串接表單、列表與功能細節。

## 版控與部署
- 專案路徑：`/Users/pei-yinglin/Projects/accounting-system/frontend`
- 若要連結 GitHub：
  1. 於 GitHub 建立新倉庫（例：`https://github.com/<account>/accounting-frontend.git`）。
  2. 在專案中設定遠端 `git remote set-url origin <repo-url>`（或 `git remote add origin <repo-url>`）。
  3. 透過 `git add . && git commit -m "..." && git push -u origin main` 推送。

## 待辦方向
- 按提供的設計，把儀表板移到左側，七張卡片下方補上表格（欄位與內容待確認）。
- 盤點費用、收支等模組所需的表單、匯入、上傳功能。
- 未來視需求接後端或 API。

---
更新時間：$(date '+%Y-%m-%d %H:%M:%S')
