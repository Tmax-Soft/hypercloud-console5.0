import * as React from 'react';
import { useState, useEffect } from 'react';
import * as _ from 'lodash-es';
import { Table as PfTable, TableHeader as PfTableHeader, TableBody as PfTableBody, IRow, ICell } from '@patternfly/react-table';

export const SingleExpandableTable: React.FC<SingleExpandableTableProps> = ({ header, itemList, rowRenderer, innerRenderer, compoundParent }) => {
  const [tableRows, setTableRows] = useState<IRow[]>([]);

  useEffect(() => {
    const preData = [];
    _.forEach(itemList, async (item, index: number) => {
      const innerTable = await innerRenderer(item);
      if (!!innerTable) {
        preData.push({
          isOpen: false,
          cells: rowRenderer(index, item, innerTable.props?.data?.length),
        });

        if (innerTable.props?.data?.length > 0) {
          //TODO: parent 값으로 어떤걸 넣어줘야 되는지 파악하기
          let parentValue = 2 * index;
          preData.push({
            parent: parentValue,
            compoundParent: compoundParent,
            cells: [
              {
                title: innerTable,
                props: { colSpan: header.length, className: 'pf-m-no-padding' },
              },
            ],
          });
        }
        setTableRows(_.cloneDeep(preData));
      }
    });
  }, [itemList]);

  const onExpand = (event, rowIndex, colIndex, isOpen, rowData, extraData) => {
    let rows: IRow[] = _.cloneDeep(tableRows);
    if (!isOpen) {
      rows[rowIndex].cells.forEach((cell: ICell) => {
        if (cell.props) cell.props.isOpen = false;
      });
      (rows[rowIndex].cells[colIndex] as ICell).props.isOpen = true;
      rows[rowIndex].isOpen = true;
    } else {
      (rows[rowIndex].cells[colIndex] as ICell).props.isOpen = false;
      rows[rowIndex].isOpen = rows[rowIndex].cells.some((cell: ICell) => cell.props && cell.props.isOpen);
    }
    setTableRows(rows);
  };

  return (
    <PfTable aria-label="Compound expandable table" onExpand={onExpand} rows={tableRows} cells={header}>
      <PfTableHeader />
      <PfTableBody />
    </PfTable>
  );
};

type SingleExpandableTableProps = {
  itemList: any[]; // outer table의 itemList
  rowRenderer: (index, obj, itemCount: number) => any[]; // outer table의 row 한줄에 들어갈 요소들을 배열 형태로 return하는 renderer 함수
  innerRenderer: (parentItem) => any; // inner table을 render하는 함수(ExpandableInnerTable 컴포넌트 사용해야됨)
  header: (ICell | string)[]; // header column들의 배열. 펼침 기능을 사용할 column object에는 cellTransforms: [compoundExpand] 속성 넣어줘야 함.
  compoundParent: number; // table 펼칠 수 있는 column의 index
};
