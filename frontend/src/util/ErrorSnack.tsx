import { Button, IconButton, Snackbar } from "@mui/material";
import React from "react";
import { Fragment } from "react";

interface ErrorSnackState {
	open: boolean;
}

class ErrorSnack extends React.Component<{}, ErrorSnackState> {
	constructor(props: any) {
		super(props);
		this.state = {
			open: false
		}
	}

	public openError = () => {
		this.setState({
			open: true
		});
	};

	private handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({
			open: false
		});
	};

	private action = (
		<Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={this.handleClose}
			>
				<i className="fa fa-close" />
			</IconButton>
		</Fragment>
	);

	render(): React.ReactNode {

		const {
			open
		} = this.state;


		return (
			<Fragment>
				<Snackbar
					open={this.state.open}
					autoHideDuration={6000}
					onClose={this.handleClose}
					message="Couldn't reach server. Please try again later."
					action={this.action}
				/>
			</Fragment>
		)
	}
}

export default ErrorSnack;