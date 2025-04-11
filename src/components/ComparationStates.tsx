

const ComparationStates = () => {
  

  return (
    <div className="flex flex-col mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-800 p-5">Comparar Estados</h1>
      <div className="relative inline-block text-left p-5">
        <label className="block mb-1 text-sm font-medium text-gray-700">Selecione um estado</label>
        <select id="estado" name="estado" className="block w-60 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200">
          <option value="SP">São Paulo</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="MG">Minas Gerais</option>
          <option value="BA">Bahia</option>
        </select>
      </div>
      <div className="bg-sky-900 p-5 rounded-lg shadow-sm w-10/12 ">
      </div>
    </div>
  );
};

export default ComparationStates;
