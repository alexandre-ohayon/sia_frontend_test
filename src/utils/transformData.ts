export const transformData = (data: any[]): any[] => {
    return data.map(item => ({
      id: item.id,
      label: item.label,
      children: item.children ? transformData(item.children) : undefined
    }));
  };
  