'use client';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Customer } from '../types/typesScript';
import moment from 'moment';

// Register zoom plugin
Chart.register(zoomPlugin);

type Props = {
  customers: Customer[];
};

const RevenueChart: React.FC<Props> = ({ customers }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const dailyPaid: { [day: string]: number } = {};
    const dailyOutstanding: { [day: string]: number } = {};

    customers.forEach((customer) => {
      customer.invoices.forEach((invoice) => {
        const day = moment(invoice.createdAt).format('YYYY-MM-DD');
        const isPaid = invoice.status.toLowerCase() === 'paid';

        if (!dailyPaid[day]) dailyPaid[day] = 0;
        if (!dailyOutstanding[day]) dailyOutstanding[day] = 0;

        if (isPaid) {
          dailyPaid[day] += invoice.amount;
        } else {
          dailyOutstanding[day] += invoice.amount;
        }
      });
    });

    const allDates = Array.from(
      new Set([...Object.keys(dailyPaid), ...Object.keys(dailyOutstanding)])
    ).sort((a, b) => moment(a).diff(moment(b)));

    const paidData = allDates.map((date) => dailyPaid[date] || 0);
    const outstandingData = allDates.map((date) => dailyOutstanding[date] || 0);

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current?.getContext('2d');
    if (ctx) {
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: allDates,
          datasets: [
            {
              label: 'Paid Revenue',
              data: paidData,
              borderColor: '#10b981',
              backgroundColor: '#10b981',
              tension: 0.3,
            },
            {
              label: 'Outstanding Revenue',
              data: outstandingData,
              borderColor: '#ef4444',
              backgroundColor: '#ef4444',
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'x',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'x',
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
              },
              ticks: {
                maxRotation: 90,
                minRotation: 45,
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Revenue (₹)',
              },
            },
          },
        },
      });
    }
  }, [customers]);

  return (
    <div className="bg-white p-6 shadow rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Daily Revenue Trend (Zoomable)</h3>
      <canvas ref={chartRef} />
    </div>
  );
};

export default RevenueChart;
