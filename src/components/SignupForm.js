import React      from 'react'
import classnames from 'classnames'

import InputField from './InputField'
import validate   from '../validations/signup'

class SignupForm extends React.Component {
  static propTypes    = { signupRequest: React.PropTypes.func.isRequired
                        , login:         React.PropTypes.func.isRequired
                        , showWelcome:   React.PropTypes.func.isRequired
                        }
  static contextTypes = { router: React.PropTypes.object.isRequired }

  constructor (props) {
    super(props)
    this.state = { username:             ''
                 , fullname:             ''
                 , email:                ''
                 , password:             ''
                 , passwordConfirmation: ''
                 , errors:               {}
                 , isFetching:           false
                 }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateUser () {
    const { errors, isValid } = validate(this.state)

    if (!isValid)
      this.setState({ errors })

    return isValid
  }

  onSubmit (e) {
    e.preventDefault()

    if (this.validateUser()) {
      this.setState({ errors:     {}
                    , isFetching: true
                    }
                   )
      this.props.signupRequest(this.state)
        .then(res => {
          console.log(res)
          this.props.login(res.data.token, res.data.username)

          this.context.router.push('/')

          this.props.showWelcome(
            { type: 'success'
            , text: 'Welcome!'
            }
          )
        })
        .catch(err => {
          console.dir(err)
          this.setState({ errors:     err.response.data
                        , isFetching: false
                        }
                       )
        })
    }
  }

  render () {
    const { errors } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <h2>Signup</h2>

        <InputField
          fieldName="username"
          label="Username"
          value={this.state.username}
          error={errors.username}
          onChange={this.onChange}
        />

        <InputField
          fieldName="fullname"
          label="Full Name"
          value={this.state.fullname}
          error={errors.fullname}
          onChange={this.onChange}
        />

        <InputField
          type="email"
          fieldName="email"
          label="Email"
          value={this.state.email}
          error={errors.email}
          onChange={this.onChange}
        />

        <InputField
          type="password"
          fieldName="password"
          label="Password"
          value={this.state.password}
          error={errors.password}
          onChange={this.onChange}
        />

        <InputField
          type="password"
          fieldName="passwordConfirmation"
          label="Password Confirmation"
          value={this.state.passwordConfirmation}
          error={errors.passwordConfirmation}
          onChange={this.onChange}
        />

        <div className="form-group">
          <button
            disabled={this.state.isFetching}
            className="Button"
          >
            Signup
          </button>
        </div>
      </form>
    )
  }
}

export default SignupForm
