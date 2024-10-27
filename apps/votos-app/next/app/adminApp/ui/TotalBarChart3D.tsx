'use client';
import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Box } from '@mui/material';

// am4core.useTheme(am4themes_animated);

interface TotalBarChart3DProps  {
  ojeda: number;
  castro: number;
  abasolo: number;
  blanks: number;
  nulls: number;  
}


export const TotalBarChart3D = (
  { ojeda, castro, abasolo, blanks, nulls }: TotalBarChart3DProps
) => {
  useEffect(() => {
    const chart = am4core.create('chartdivTotal', am4charts.XYChart3D);

    // Datos del gráfico
    chart.data = [
      { option: 'Abasolo', value: abasolo, color: '#546e7a' },
      { option: 'Castro', value: castro, color: '#039be5' },
      { option: 'Ojeda', value: ojeda, color: '#ffb300' },
      { option: 'Blancos', value: blanks, color: '#c2185b' },
      { option: 'Nulos', value: nulls, color: '#7cb342' },
    ];

    // Eje X
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'option';
    categoryAxis.title.text = '';
    categoryAxis.renderer.labels.template.fontSize = 10; // Reducir tamaño de la fuente en el eje X

    // Eje Y
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = '';
    valueAxis.renderer.labels.template.fontSize = 9; // Reducir tamaño de la fuente en el eje Y

    // Serie de barras
    const series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'option';
    series.name = 'Value';

    // Reducir tamaño de la fuente de las etiquetas de valor en las barras
    series.columns.template.fontSize = 10; // Aplicar a las columnas
    //series.columns.template.adapter.add("fontSize", () => 10); // En caso de necesitar adaptación adicional

    // Aplicar color a las barras
    series.columns.template.propertyFields.fill = 'color';

    // Calcular el total para el porcentaje
    const totalValue = chart.data.reduce((sum, data) => sum + data.value, 0);

    // Agregar etiquetas sobre las barras
    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = '{valueY} ({percent}%)'; // Mostrar el valor y el porcentaje
    labelBullet.label.fill = am4core.color('#ffffff'); // Color del texto
    labelBullet.label.fontSize = 10; // Tamaño de la fuente reducido
    labelBullet.locationY = 0.5; // Ajustar posición vertical de la etiqueta
    labelBullet.label.dy = -10; // Elevar el texto un poco sobre la barra

    // Configurar el cálculo del porcentaje
    series.columns.template.adapter.add("tooltipText", (tooltipText, target) => {
      //@ts-ignore
      const value = target.dataItem.valueY;
      const percent = ((value / totalValue) * 100).toFixed(2); // Calcular el porcentaje
      //@ts-ignore
      return tooltipText.replace("{percent}", percent); // Reemplazar el valor del porcentaje
    });

    // Añadir el porcentaje en la etiqueta
    labelBullet.label.adapter.add("text", (text, target) => {
      //@ts-ignore
      const value = target.dataItem.valueY;
      const percent = ((value / totalValue) * 100).toFixed(2); // Calcular el porcentaje
      return `${value} (${percent}%)`; // Retornar el texto con valor y porcentaje
    });

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div id="chartdivTotal" style={{ width: '100%', height: '28vh' }}></div>
  );
};


