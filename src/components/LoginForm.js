import React   from 'react'
import isEmpty from 'lodash/isEmpty'

import InputField from './InputField'
import validate   from '../validations/login'

class LoginForm extends React.Component {
  static propTypes    = { handleSubmit: React.PropTypes.func.isRequired }
  static contextTypes = { router:       React.PropTypes.object.isRequired }

  constructor (props) {
    super(props)
    this.state    = { identifier: ''
                    , password:   ''
                    , errors:     {}
                    , isFetching: false
                    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  // 사용자 정보가 형식에 맞는지 확인하고 로그인 요청을 보냅니다.
  onSubmit (e) {
    e.preventDefault()

    // Validate login data and set errors state.
    const { errors, isValid } = validate(this.state)

    isEmpty(errors) || this.setState({ errors })

    if (isValid) {
      this.setState({ errors: {}, isFetching: true })
      this.props.handleSubmit(this)
    }
  }

  // 사용자 정보와 관련된 상태를 업데이트합니다.
  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { identifier, password, errors, isFetching } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <h2>Login</h2>

        {errors.form &&
          <div className="alert alert-danger">{errors.form}</div>
        }

        <InputField
          fieldName="identifier"
          label="Username or Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <InputField
          type="password"
          fieldName="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
        />

      <div className="form-group">
        <button
          className="Button"
          disabled={isFetching}
        >
          Login
        </button>
      </div>
      </form>
    )
  }
}

export default LoginForm
