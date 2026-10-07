import React, { forwardRef } from 'react';

const PrintableForm = forwardRef(({ formData }, ref) => {
  return (
    <div ref={ref} className="bg-white p-8 max-w-4xl mx-auto print:p-0 print:m-0 text-xs text-gray-800 font-sans">
      <div className="border-2 border-gray-800 p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-gray-800 pb-4 mb-4">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-wider">Solicitud de Crédito Hipotecario</h1>
            <p className="text-gray-600">MiKasApp - Solicitud Automatizada</p>
          </div>
          <div className="text-right">
            <div className="border border-gray-400 p-2 min-w-[150px]">
              <p className="font-bold">Crédito No.</p>
              <p className="h-4"></p>
            </div>
          </div>
        </div>

        {/* User Specific Inputs */}
        <div className="grid grid-cols-3 gap-4 mb-6 border border-gray-400 p-2 bg-gray-50">
          <div>
            <span className="font-bold">Programa de Vivienda: </span>
            <span className="underline">{formData.preferences.programaVivienda || '__________________'}</span>
          </div>
          <div>
            <span className="font-bold">Banco: </span>
            <span className="underline">{formData.preferences.banco || '__________________'}</span>
          </div>
          <div>
            <span className="font-bold">Caja de Compensación: </span>
            <span className="underline">{formData.preferences.cajaCompensacion || '__________________'}</span>
          </div>
        </div>

        {/* 1. Datos del Solicitante */}
        <h2 className="bg-gray-200 font-bold p-1 border border-gray-400 text-center uppercase mb-2">
          Datos del Solicitante
        </h2>
        <div className="border border-gray-400 mb-4">
          <div className="grid grid-cols-3 border-b border-gray-400">
            <div className="p-2 border-r border-gray-400 col-span-3 md:col-span-1">
              <span className="font-bold block text-[10px]">Nombres:</span>
              {formData.personal.nombres || '\u00A0'}
            </div>
            <div className="p-2 border-r border-gray-400">
              <span className="font-bold block text-[10px]">Primer Apellido:</span>
              {formData.personal.primerApellido || '\u00A0'}
            </div>
            <div className="p-2">
              <span className="font-bold block text-[10px]">Segundo Apellido:</span>
              {formData.personal.segundoApellido || '\u00A0'}
            </div>
          </div>
          
          <div className="grid grid-cols-4 border-b border-gray-400">
            <div className="p-2 border-r border-gray-400 col-span-2">
              <span className="font-bold block text-[10px]">Tipo y No. Identificación:</span>
              {formData.personal.identificacion || '\u00A0'}
            </div>
            <div className="p-2 border-r border-gray-400">
              <span className="font-bold block text-[10px]">Fecha Nacimiento:</span>
              {formData.personal.fechaNacimiento || '\u00A0'}
            </div>
            <div className="p-2">
              <span className="font-bold block text-[10px]">Estado Civil:</span>
              {formData.personal.estadoCivil || '\u00A0'}
            </div>
          </div>

          <div className="grid grid-cols-3 border-b border-gray-400">
            <div className="p-2 border-r border-gray-400 col-span-2">
              <span className="font-bold block text-[10px]">Dirección de Residencia:</span>
              {formData.personal.direccion || '\u00A0'}
            </div>
            <div className="p-2">
              <span className="font-bold block text-[10px]">Ciudad:</span>
              {formData.personal.ciudad || '\u00A0'}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="p-2 border-r border-gray-400">
              <span className="font-bold block text-[10px]">Teléfono/Celular:</span>
              {formData.personal.telefono || '\u00A0'}
            </div>
            <div className="p-2 border-r border-gray-400 col-span-2">
              <span className="font-bold block text-[10px]">Correo Electrónico:</span>
              {formData.personal.email || '\u00A0'}
            </div>
          </div>
        </div>

        {/* 2. Datos Financieros */}
        <h2 className="bg-gray-200 font-bold p-1 border border-gray-400 text-center uppercase mb-2">
          Información Laboral y Financiera
        </h2>
        <div className="border border-gray-400 mb-4">
          <div className="grid grid-cols-2 border-b border-gray-400">
            <div className="p-2 border-r border-gray-400">
              <span className="font-bold block text-[10px]">Empresa donde labora:</span>
              {formData.financiera.empresa || '\u00A0'}
            </div>
            <div className="p-2">
              <span className="font-bold block text-[10px]">Cargo:</span>
              {formData.financiera.cargo || '\u00A0'}
            </div>
          </div>
          <div className="grid grid-cols-3 border-b border-gray-400 bg-gray-50">
            <div className="p-2 border-r border-gray-400 font-bold text-center">Ingresos</div>
            <div className="p-2 border-r border-gray-400 font-bold text-center">Egresos</div>
            <div className="p-2 font-bold text-center">Patrimonio</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-2 border-r border-gray-400">
              <span className="font-bold block text-[10px]">Salario Básico:</span>
              $ {formData.financiera.salario || '0'}
            </div>
            <div className="p-2 border-r border-gray-400">
              <span className="font-bold block text-[10px]">Gastos Fijos:</span>
              $ {formData.financiera.egresos || '0'}
            </div>
            <div className="p-2">
              <span className="font-bold block text-[10px]">Valor Inmuebles/Vehículos:</span>
              $ {formData.financiera.patrimonio || '0'}
            </div>
          </div>
        </div>
        
        {/* Signatures */}
        <div className="mt-16 grid grid-cols-2 gap-8">
          <div className="border-t border-gray-800 pt-2 text-center">
            <p className="font-bold">Firma del Solicitante</p>
            <p className="text-gray-500 text-[10px]">C.C. {formData.personal.identificacion}</p>
          </div>
          <div className="border-t border-gray-800 pt-2 text-center">
            <p className="font-bold">Huella Índice Derecho</p>
            <div className="w-16 h-20 border border-gray-300 mx-auto mt-2"></div>
          </div>
        </div>

      </div>
    </div>
  );
});

export default PrintableForm;
