'use client';
import React, { useEffect, useRef } from 'react';
import Chart, { ChartOptions } from 'chart.js/auto';
import { IBlocks } from '@/common/interfaces/Blocks';
import Card from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import { ROUTER } from '@/common/constants';

const avgBlockTimeSecs = 30;

const LineChart = ({ blocks }: { blocks: IBlocks[] | undefined }) => {
  const router = useRouter();
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [totalMinutes, setTotalMinutes] = React.useState<string>('');

  useEffect(() => {
    if (!blocks || !chartRef.current) return;

    const data = blocks.map((block) => block.txDensity);

    // Generate labels for the last 20 minutes in 5-minute intervals
    const now = new Date();
    const timeLabels = [];
    for (let i = 0; i <= 4; i++) {
      // 5 intervals for 20 minutes (0, 5, 10, 15, 20)
      const intervalTime = new Date(now.getTime() - i * 5 * 60 * 1000);
      timeLabels.unshift(
        intervalTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      );
    }

    // Create an array of empty strings for each block, except for the time intervals
    const labels = Array(blocks.length).fill('');
    const interval = Math.floor(blocks.length / 4); // Divide into 4 intervals
    for (let i = 0; i < 5; i++) {
      const labelIndex = Math.floor(i * interval);
      if (labelIndex < blocks.length) {
        labels[labelIndex] = timeLabels[i];
      }
    }

    setTotalMinutes(((blocks.length * avgBlockTimeSecs) / 60).toFixed(0));

    if (chartInstance.current) {
      chartInstance.current.data.labels = labels;
      chartInstance.current.data.datasets[0].data = data;
      chartInstance.current.update();
    } else {
      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              borderColor: '#FF9100',
              backgroundColor: 'rgba(255, 145, 0, 0.2)',
              fill: true,
              borderWidth: 1,
              tension: 0.2,
              pointBackgroundColor: '#FF9100',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            interaction: {
              intersect: false,
              mode: 'index',
              axis: 'x',
            },
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
            tooltip: {
              intersect: false,
              titleColor: '#4A90E2',
              bodyColor: '#ffffff',
              borderColor: 'transparent',
              borderWidth: 0,
              pointStyle: 'star',
              position: 'nearest',
              displayColors: false,
              callbacks: {
                label: function (tooltipItem) {
                  const blockIndex = tooltipItem.dataIndex;
                  if (!blocks) return '';
                  const block = blocks[blockIndex];
                  const blockTime = new Date(Number(block.timestamp) * 1000);

                  return [
                    `Block: ${block.number}`,
                    `Density: ${block.txDensity.toFixed(2)}`,
                    `Txs: ${block.transactions}`,
                    `Time: ${blockTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`,
                    '(click to view block details)',
                  ];
                },
                title: function () {
                  return '';
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: true,
                borderDash: [5, 5],
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                display: true,
                callback: function (value, index) {
                  return labels[index];
                },
                maxRotation: 0,
                minRotation: 0,
              },
            },
            y: {
              grid: {
                color: '#262626',
              },
              ticks: {
                color: '#b8b8b8',
                callback: function (value) {
                  return value === 0 ? '' : value;
                },
              },
            },
          },
          onClick: () => {
            if (!chartInstance.current) return;
            const tooltip = chartInstance.current.tooltip;
            if (tooltip && tooltip.dataPoints && tooltip.dataPoints.length) {
              const blockIndex = tooltip.dataPoints[0].dataIndex;
              const block = blocks[blockIndex];
              window.open(`${ROUTER.BLOCKS.INDEX}/${block.number}`, '_blank');
            }
          },
          onHover: (event, chartElement) => {
            if (!event?.native) return;
            const target = event.native.target as HTMLElement;
            const tooltip = chartInstance.current?.tooltip;

            if (chartElement.length || (tooltip && tooltip.opacity !== 0)) {
              target.style.cursor = 'pointer';
            } else {
              target.style.cursor = 'default';
            }
          },
        } as ChartOptions,
      });
    }
  }, [blocks, router]);

  return (
    <Card className="h-50 w-full bg-secondary">
      <h2 className="mb-2 text-lg font-medium">
        Transactions Density (last {totalMinutes} mins)
      </h2>
      <div className="w-full h-32">
        <canvas ref={chartRef} style={{ width: '100%', height: '110px' }} />
      </div>
    </Card>
  );
};

export default LineChart;
