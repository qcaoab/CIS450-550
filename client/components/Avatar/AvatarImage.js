import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import { Avatar } from './Avatar';
import { AvatarFont } from './AvatarFont';

class AvatarImage extends React.PureComponent {
    imgRef = React.createRef();

    static propTypes = {
        src: PropTypes.string.isRequired,
        placeholder: PropTypes.node,
        alt: PropTypes.string,
        className: PropTypes.string,
        ..._.omit(Avatar.propTypes, ['children'])
    };

    static defaultProps = {
        placeholder: <i className="fa fa-user fa-fw"></i>
    }

    constructor(props) {
        super(props);
        
        this.state = {
            imgLoaded: false
        };
    }

    componentDidMount() {
        if (this.imgRef && this.imgRef.current && this.imgRef.current.naturalWidth !== 0) {
            this.setState({ imgLoaded: true });
        }
    }

    render() {
        const { src, placeholder, alt, className, ...avatarProps } = this.props;
        const parentClass = classNames('avatar-image', {
            'avatar-image--loaded': this.state.imgLoaded
        }, className);

        return (
            <div className={ parentClass }>
                <Avatar className="avatar-image__image" {...avatarProps}>
                    <img
                        src={ src }
                        alt={ alt }
                        ref={ this.imgRef }
                        onLoad={ () => { this.setState({ imgLoaded: true }) } }
                    />
                </Avatar>
                {
                    !this.state.imgLoaded && (
                        <AvatarFont className="avatar-image__placeholder" {...avatarProps}>
                            { placeholder }
                        </AvatarFont>
                    )
                }
            </div>
        )
    }
}

export { AvatarImage };
