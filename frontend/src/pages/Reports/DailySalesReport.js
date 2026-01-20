import React, { useState, useEffect } from 'react';
import { PageHeader, Card, SummaryCard } from '../../components/UI';
import APIService from '../../services/api';

const DailySalesReport = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const data = await APIService.getDailySalesReport();
      setReport(data);
    } catch (error) {
      console.error('Failed to load report:', error);
    }
  };

  return (
    <div>
      <PageHeader title="Daily Sales Report" breadcrumbs={['Home', 'Reports', 'Daily Sales']} />
      
      {report && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <SummaryCard title="Total Bills" value={report.total_bills} icon="📝" color="blue" />
            <SummaryCard title="Total Amount" value={`₹${report.total_amount}`} icon="💰" color="green" />
            <SummaryCard title="Date" value={report.date} icon="📅" color="purple" />
          </div>
          
          <Card title="Payment Mode Breakdown" className="mb-6">
            <div className="space-y-2">
              {Object.entries(report.payment_mode_breakdown || {}).map(([mode, amount]) => (
                <div key={mode} className="flex justify-between">
                  <span className="font-medium">{mode}</span>
                  <span>₹{amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </Card>
          
          <Card title="Recent Bills">
            <div className="space-y-2">
              {report.bills?.map((bill, idx) => (
                <div key={idx} className="flex justify-between border-b pb-2">
                  <span>{bill.bill_number}</span>
                  <span className="font-semibold">₹{bill.amount}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default DailySalesReport;
