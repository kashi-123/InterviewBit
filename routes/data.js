const data = {}
const start = {}

exports.printData = (req,res,next)=>{ 
	console.log( req.body );
};

exports.saveData = (req,res,next)=>{ 

	var ds = new Date(req.body.start);
	var de = new Date(req.body.end);
	if ( req.body.email in data ){
		res.render( 'error', { message: 'Already scheduled for interview'} );
	} else if ( ds.getTime() > de.getTime() ) {
		res.render( 'error', { message: 'End time before Start time'} );
	} else {
		data[ req.body.email ] = req.body;
		if ( req.body.start in start ) start[req.body.start] += 1;
		else start[req.body.start] = 1;
		res.render( 'success', { schedule: data[ req.body.email ] }  );
	}
		
};

exports.queryData = (req,res,next)=>{ 

	if ( req.body.email in data ){
		res.render( 'success', { schedule: data[ req.body.email ] }   );
	} else {
		res.render( 'error', { message: 'No interview scheduled'} );
	}
		
};

exports.deleteData = (req,res,next)=>{ 

	startTime = data[req.body.email].start;
	if ( start[startTime] < 4 ) {
		res.render( 'error', { message: 'Interviewees less than 2 error'} );
	} else {
		delete data[ req.body.email ];
		res.redirect('/')
	}
		
};

exports.editData = (req,res,next)=>{ 

	if ( req.body.email in data ){
		startTime = data[req.body.email].start;
		if ( start[startTime] < 4 ) {
			res.render( 'error', { message: 'Interviewees less than 2 error'} );
		} else {
			var ds = new Date(req.body.start);
			var de = new Date(req.body.end);
			if ( ds.getTime() > de.getTime() ) {
				res.render( 'error', { message: 'End time before Start time'} );
			} else {
				data[ req.body.email ] = req.body;
				res.render( 'success', { schedule: data[ req.body.email ] }  );
			}
		}
	} else {
		res.render( 'error', { message: 'No interview scheduled'} );
	}
		
};

