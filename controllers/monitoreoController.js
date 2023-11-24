const sql = require('mssql');

exports.getData = async (req, res) => {
    const pool = new sql.Request();
    pool.query(
        'SELECT C.nom_Cliente, C.telefono, C.correo, P.pedido, P.estatus, P.CORTE, P.ENCHAPE, P.EMBALAJE, P.GA, P.fecha_Inicio, P.lugar_Destino, P.fecha_Entrega FROM CLIENTE AS C INNER JOIN PROYECTOS AS P ON C.id_Cliente = P.id_Cliente',
        (err, results) => {
            if (err) {
                console.error(err);
            } else {
                res.render('index', { results: results.recordset });
            }
        }
    );
};

exports.updateProyecto = async(req, res)=>{
    const pool = new sql.Request();
    const body = { ...req.body };

    pool.input('idPedido', sql.VarChar, body.id)
        .input('valorCorte', sql.Int, body.valorCorte)
        .input('valorEmbalaje',sql.Int, body.valorEmbalaje)
        .input('valorEnchape',sql.Int, body.valorEnchape)
        .input('valorEstatus',sql.VarChar, body.valorEstatus)
        .query('UPDATE PROYECTOS SET CORTE = @valorCorte, EMBALAJE = @valorEmbalaje, ENCHAPE = @valorEnchape, estatus = @valorEstatus WHERE pedido = @idPedido')
  };

exports.getDataView = async(req, res)=>{
    try {
        const pool = new sql.Request();
        const {idPedido} = req.params;

        console.log(idPedido);

        const visualizarPedido = await pool.input('idOrden', sql.VarChar, idPedido)
                                  .query('SELECT C.nom_Cliente, C.correo, C.telefono, C.direccion,  P.id_Producto, P.pedido, P.fecha_Inicio, P.cant_PZAS, P.medida_M2, P.GA, P.estatus, P.fecha_Entrega, P.CORTE, P.ENCHAPE, P.EMBALAJE, P.tipo_EM, P.modelo_A1, P.modelo_A2, P.modelo_L1, P.modelo_L2, P.cant_Tablero, P.cant_RET, P.medida_ML, P.PTR, P.REM, P.lugar_Destino, P.tipo_Trasporte FROM CLIENTE AS C INNER JOIN PROYECTOS AS P ON P.id_Cliente = C.id_Cliente WHERE P.pedido = @idOrden')
                                  
        const productoId = visualizarPedido.recordset[0].id_Producto

  
        const viewProducto = await pool.input('idPro', sql.Int, productoId)
                               .query('SELECT * FROM PRODUCTO WHERE id_Producto = @idPro')

        const productoResult = await pool.query(' SELECT * FROM PRODUCTO');
        const clienteResult = await pool.query('SELECT * FROM CLIENTE');
        const modeloResult = await pool.query('SELECT * FROM PRODUCTOS_MODELOS')

        const results = [
            visualizarPedido.recordset,
            viewProducto.recordset,
            productoResult.recordset,
            clienteResult.recordset,
            modeloResult.recordset,
        ]

        console.log(results);
        return res.render('view', { results: results });
    } catch (error) {
        console.log(error);
    }
};

exports.deleteProyecto = async(req, res)=>{
    try {
        const pool = new sql.Request();
        const body = { ...req.body };
        await pool.input('Idpedido', sql.VarChar, body.idPedido)
                  .query('DELETE PROYECTOS WHERE pedido = @Idpedido')
    } catch (error) {
        console.log(error)
    }    
};