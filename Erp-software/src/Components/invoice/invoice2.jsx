import React from 'react'

function InvoicePDF() {
    const MyDocument = () => (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
    )
    return (
        <>  </>
    )
  
}

export default Invoice2
