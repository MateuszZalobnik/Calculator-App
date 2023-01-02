import styled from 'styled-components';
interface Props {
  light?: boolean;
  value: string | number;
}

export const Wrapper = styled.button<Props>`
  background-color: ${(props) =>
    props.light == true
      ? props.theme.colors.green
      : props.theme.colors.darkBlue};
  color: ${(props) =>
    props.light == true
      ? props.theme.colors.darkBlue
      : props.theme.colors.green};
  font-size: ${({ theme }) => theme.fontSize.l};
  ${(props) =>
    props.value == '='
      ? 'grid-column-start: 4; grid-row-start: 3; grid-row-end: 6;'
      : null}
  font-weight: ${({ theme }) => theme.fontWeight.s};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.s};
  cursor: pointer;
  ${({ theme }) => theme.mq.desktop} {
    padding: 10px;
    border-right: 2px solid ${({ theme }) => theme.colors.black};
    border-bottom: 2px solid ${({ theme }) => theme.colors.black};
  }

  :hover {
    background-color: ${(props) =>
      props.light == true
        ? props.theme.colors.darkGreen
        : props.theme.colors.primary};
    color: ${(props) =>
      props.light == true
        ? props.theme.colors.primary
        : props.theme.colors.darkGreen};
  }
`;
