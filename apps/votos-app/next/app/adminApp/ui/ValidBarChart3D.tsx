'use client';
import 'dotenv/config';

import React, { useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import io from 'socket.io-client';
import { getTotals } from '@/app/actions/tables';
//const socketHost = process.env.NEXT_PUBLIC_WS_HOST_TABLES;

const socketHost = 'ws://localhost:9002'; 
// am4core.useTheme(am4themes_animated);

export const ValidBarChart3D = () => {
  const [ojeda, setOjeda] = useState(0);
  const [castro, setCastro] = useState(0);
  const [abasolo, setAbasolo] = useState(0);
  const [blanks, setBlanks] = useState(0);

  useEffect(() => {
    console.log('Conectando WS-TABLES from 3d:', socketHost);

    const socket = io(socketHost);

    const fetchTotals = async () => {
      const data = await getTotals();
      console.log('data From Effect', data);
      setOjeda(data.ojeda);
      setCastro(data.castro);
      setAbasolo(data.abasolo);
      setBlanks(data.blanks);
    };

    fetchTotals();

    socket.on('connect', () => {
      console.log('Conectado al WS-TABLES from 3d');
    });

    socket.on('updateTables', () => {
      console.log('Actualizando mesas');
      fetchTotals();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Solo se ejecuta cuando cambia alguna de las variables de estado
    const chart = am4core.create('chartdiv', am4charts.XYChart3D);

    // Datos del gráfico
    chart.data = [
      { option: 'Abasolo', value: abasolo, color: '#546e7a' },
      { option: 'Castro', value: castro, color: '#039be5' },
      { option: 'Ojeda', value: ojeda, color: '#ffb300' },
      { option: 'Blancos', value: blanks, color: '#c2185b' }
    ];

    // Eje X
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'option';
    categoryAxis.title.text = '';
    categoryAxis.renderer.labels.template.fontSize = 10;

    // Eje Y
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = '';
    valueAxis.renderer.labels.template.fontSize = 9;

    // Serie de barras
    const series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'option';
    series.name = 'Value';

    series.columns.template.fontSize = 10;
    series.columns.template.propertyFields.fill = 'color';

    // Calcular el total para el porcentaje
    const totalValue = chart.data.reduce((sum, data) => sum + data.value, 0);

    // Agregar etiquetas sobre las barras
    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = '{valueY} ({percent}%)';
    labelBullet.label.fill = am4core.color('#ffffff');
    labelBullet.label.fontSize = 10;
    labelBullet.locationY = 0.5;
    labelBullet.label.dy = -10;

    // // Configurar el cálculo del porcentaje
    // series.columns.template.adapter.add("tooltipText", (tooltipText, target) => {
    //   const value = 0;
    //   const percent = ((value / totalValue) * 100).toFixed(2);
    //   return tooltipText.replace("{percent}", percent);
    // });

    // // Añadir el porcentaje en la etiqueta
    // labelBullet.label.adapter.add("text", (text, target) => {
    //   const value = 0;
    //   const percent = ((value / totalValue) * 100).toFixed(2);
    //   return `${value} (${percent}%)`;
    // });

    return () => {
      chart.dispose(); // Limpiar el gráfico al desmontar el componente
    };
  }, [ojeda, castro, abasolo, blanks]); // Asegúrate de incluir las dependencias aquí

  return (
    <div id="chartdiv" style={{ width: '100%', height: '40vh' }}></div>
  );
};
